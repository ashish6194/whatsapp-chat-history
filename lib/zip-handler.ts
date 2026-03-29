import JSZip from 'jszip';

const MAX_MEDIA_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file

const MEDIA_EXTENSIONS = new Set([
  'jpg', 'jpeg', 'png', 'gif', 'webp',
  'mp4', 'mov', 'avi', 'mkv', '3gp',
  'mp3', 'ogg', 'opus', 'm4a', 'aac',
  'pdf', 'doc', 'docx',
]);

export interface ZipResult {
  chatText: string;
  mediaMap: Map<string, string>;
}

function getExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

function getBaseName(path: string): string {
  return path.split('/').pop() || path;
}

export async function extractWhatsAppZip(file: File): Promise<ZipResult> {
  const zip = await JSZip.loadAsync(file);
  const mediaMap = new Map<string, string>();
  let chatText = '';

  // Find the chat text file (_chat.txt or any root .txt file)
  const txtFiles: string[] = [];
  zip.forEach((relativePath, entry) => {
    if (!entry.dir && relativePath.endsWith('.txt')) {
      txtFiles.push(relativePath);
    }
  });

  // Prefer _chat.txt, then WhatsApp Chat*.txt, then first .txt
  const chatFile =
    txtFiles.find((f) => getBaseName(f) === '_chat.txt') ||
    txtFiles.find((f) => getBaseName(f).startsWith('WhatsApp Chat')) ||
    txtFiles[0];

  if (!chatFile) {
    throw new Error('No chat text file found in the zip. Expected _chat.txt or a .txt file.');
  }

  const chatEntry = zip.file(chatFile);
  if (chatEntry) {
    chatText = await chatEntry.async('string');
  }

  // Extract media files and create object URLs
  const mediaPromises: Promise<void>[] = [];

  zip.forEach((relativePath, entry) => {
    if (entry.dir) return;

    const ext = getExtension(relativePath);
    if (!MEDIA_EXTENSIONS.has(ext)) return;

    const baseName = getBaseName(relativePath);

    mediaPromises.push(
      entry.async('blob').then((blob) => {
        // Skip files larger than 10MB to avoid memory issues
        if (blob.size > MAX_MEDIA_FILE_SIZE) return;
        const url = URL.createObjectURL(blob);
        mediaMap.set(baseName, url);
      })
    );
  });

  await Promise.all(mediaPromises);

  return { chatText, mediaMap };
}

export function revokeMediaUrls(mediaMap: Map<string, string>) {
  for (const url of mediaMap.values()) {
    URL.revokeObjectURL(url);
  }
  mediaMap.clear();
}
