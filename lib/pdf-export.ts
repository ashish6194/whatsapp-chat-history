import { jsPDF } from 'jspdf';
import { Chat, Message } from './types';
import { formatTime, formatDate, isSameDay, getParticipantColor } from './utils';

export interface ExportOptions {
  messages?: Message[]; // If provided, export only these (filtered). Otherwise export all.
}

// Colors
const COLOR = {
  headerBg: [7, 94, 84] as [number, number, number],         // #075e54
  headerText: [255, 255, 255] as [number, number, number],
  outgoingBg: [217, 253, 211] as [number, number, number],    // #d9fdd3
  incomingBg: [255, 255, 255] as [number, number, number],
  systemBg: [226, 214, 186] as [number, number, number],      // #e2d6ba
  pageBg: [234, 230, 223] as [number, number, number],        // #eae6df
  textPrimary: [17, 27, 33] as [number, number, number],      // #111b21
  textSecondary: [102, 119, 129] as [number, number, number], // #667781
  dateSepBg: [255, 255, 255] as [number, number, number],
  tickBlue: [83, 189, 235] as [number, number, number],       // #53bdeb
};

// Layout constants (in mm, A4 = 210 x 297)
const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 15;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BUBBLE_MAX_W = CONTENT_W * 0.7;
const BUBBLE_PAD_X = 4;
const BUBBLE_PAD_Y = 2.5;
const LINE_H = 4.5;
const FONT_SIZE = 9;
const FONT_SIZE_SMALL = 7;
const FONT_SIZE_SENDER = 8;

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  const paragraphs = text.split('\n');

  for (const para of paragraphs) {
    if (!para.trim()) {
      lines.push('');
      continue;
    }
    const wrapped = doc.splitTextToSize(para, maxWidth) as string[];
    lines.push(...wrapped);
  }
  return lines;
}

export function exportChatToPDF(chat: Chat, options?: ExportOptions): void {
  const messages = options?.messages || chat.messages;
  if (messages.length === 0) return;

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = MARGIN;

  function checkPage(needed: number) {
    if (y + needed > PAGE_H - MARGIN) {
      doc.addPage();
      // Page background
      doc.setFillColor(...COLOR.pageBg);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
      y = MARGIN;
    }
  }

  // Page background
  doc.setFillColor(...COLOR.pageBg);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

  // Header
  doc.setFillColor(...COLOR.headerBg);
  doc.rect(0, 0, PAGE_W, 18, 'F');
  doc.setTextColor(...COLOR.headerText);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(chat.name, MARGIN, 8);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(chat.participants.join(', '), MARGIN, 13);
  y = 24;

  // Messages
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const prev = i > 0 ? messages[i - 1] : null;

    // Date separator
    if (!prev || !isSameDay(prev.timestamp, msg.timestamp)) {
      checkPage(12);
      const dateText = formatDate(msg.timestamp);
      doc.setFontSize(FONT_SIZE_SMALL);
      doc.setFont('helvetica', 'normal');
      const dateW = doc.getTextWidth(dateText) + 8;
      const dateX = (PAGE_W - dateW) / 2;
      doc.setFillColor(...COLOR.dateSepBg);
      doc.roundedRect(dateX, y, dateW, 6, 1.5, 1.5, 'F');
      doc.setTextColor(...COLOR.textSecondary);
      doc.text(dateText, PAGE_W / 2, y + 4.2, { align: 'center' });
      y += 10;
    }

    // System message
    if (msg.type === 'system') {
      doc.setFontSize(FONT_SIZE_SMALL);
      doc.setFont('helvetica', 'italic');
      const sysLines = wrapText(doc, msg.content, CONTENT_W - 20);
      const sysH = sysLines.length * LINE_H + 4;
      checkPage(sysH + 4);

      const sysW = Math.min(
        Math.max(...sysLines.map((l) => doc.getTextWidth(l))) + 10,
        CONTENT_W - 10
      );
      const sysX = (PAGE_W - sysW) / 2;
      doc.setFillColor(...COLOR.systemBg);
      doc.roundedRect(sysX, y, sysW, sysH, 1.5, 1.5, 'F');
      doc.setTextColor(...COLOR.textSecondary);
      sysLines.forEach((line, li) => {
        doc.text(line, PAGE_W / 2, y + 3 + li * LINE_H, { align: 'center' });
      });
      y += sysH + 3;
      continue;
    }

    // Chat bubble
    const isOut = msg.isOutgoing;
    const showSender = chat.isGroup && !isOut && (!prev || prev.sender !== msg.sender || prev.type === 'system');

    // Prepare text
    doc.setFontSize(FONT_SIZE);
    doc.setFont('helvetica', 'normal');
    const content = msg.type === 'media'
      ? `[${msg.mediaType || 'Media'}]${msg.mediaFilename ? ' ' + msg.mediaFilename : ''}`
      : msg.content;
    const textLines = wrapText(doc, content, BUBBLE_MAX_W - BUBBLE_PAD_X * 2 - 15);
    const timeStr = formatTime(msg.timestamp);
    doc.setFontSize(FONT_SIZE_SMALL);
    const timeW = doc.getTextWidth(timeStr + (isOut ? ' ✓✓' : ''));

    // Calculate bubble height
    let bubbleH = BUBBLE_PAD_Y * 2 + textLines.length * LINE_H + 3; // +3 for timestamp line
    if (showSender) bubbleH += LINE_H;

    // Calculate bubble width
    doc.setFontSize(FONT_SIZE);
    const maxTextW = Math.max(
      ...textLines.map((l) => doc.getTextWidth(l)),
      timeW + 2,
      showSender ? doc.getTextWidth(msg.sender) : 0
    );
    const bubbleW = Math.min(maxTextW + BUBBLE_PAD_X * 2 + 4, BUBBLE_MAX_W);

    checkPage(bubbleH + 3);

    // Bubble position
    const bubbleX = isOut ? PAGE_W - MARGIN - bubbleW : MARGIN;

    // Draw bubble
    doc.setFillColor(...(isOut ? COLOR.outgoingBg : COLOR.incomingBg));
    doc.roundedRect(bubbleX, y, bubbleW, bubbleH, 1.5, 1.5, 'F');

    let textY = y + BUBBLE_PAD_Y;

    // Sender name
    if (showSender) {
      const senderColor = hexToRgb(getParticipantColor(msg.sender, chat.participants));
      doc.setTextColor(...senderColor);
      doc.setFontSize(FONT_SIZE_SENDER);
      doc.setFont('helvetica', 'bold');
      doc.text(msg.sender, bubbleX + BUBBLE_PAD_X, textY + 3);
      textY += LINE_H;
    }

    // Message text
    doc.setTextColor(...COLOR.textPrimary);
    doc.setFontSize(FONT_SIZE);
    doc.setFont('helvetica', 'normal');
    textLines.forEach((line, li) => {
      doc.text(line, bubbleX + BUBBLE_PAD_X, textY + 3 + li * LINE_H);
    });

    // Timestamp + ticks
    doc.setTextColor(...COLOR.textSecondary);
    doc.setFontSize(FONT_SIZE_SMALL);
    const tickStr = isOut ? timeStr + ' ✓✓' : timeStr;
    doc.text(tickStr, bubbleX + bubbleW - BUBBLE_PAD_X, y + bubbleH - BUBBLE_PAD_Y, { align: 'right' });

    if (isOut) {
      // Color the ticks blue
      doc.setTextColor(...COLOR.tickBlue);
      doc.text('✓✓', bubbleX + bubbleW - BUBBLE_PAD_X, y + bubbleH - BUBBLE_PAD_Y, { align: 'right' });
    }

    y += bubbleH + 2;
  }

  // Footer on last page
  doc.setFontSize(6);
  doc.setTextColor(...COLOR.textSecondary);
  doc.text('Generated by WhatsApp Chat Viewer', PAGE_W / 2, PAGE_H - 5, { align: 'center' });

  // Download
  const dateStr = new Date().toISOString().split('T')[0];
  const safeName = chat.name.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '_');
  doc.save(`${safeName}_${dateStr}.pdf`);
}
