import { Message, FilterState } from './types';

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (isSameDay(date, today)) return 'Today';
  if (isSameDay(date, yesterday)) return 'Yesterday';

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function filterMessages(messages: Message[], filters: FilterState): Message[] {
  return messages.filter((msg) => {
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesContent = msg.content.toLowerCase().includes(query);
      const matchesSender = msg.sender.toLowerCase().includes(query);
      if (!matchesContent && !matchesSender) return false;
    }

    if (filters.selectedSender && msg.sender !== filters.selectedSender) {
      return false;
    }

    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom);
      from.setHours(0, 0, 0, 0);
      if (msg.timestamp < from) return false;
    }

    if (filters.dateTo) {
      const to = new Date(filters.dateTo);
      to.setHours(23, 59, 59, 999);
      if (msg.timestamp > to) return false;
    }

    if (filters.mediaOnly && msg.type !== 'media') return false;

    if (filters.hideSystemMessages && msg.type === 'system') return false;

    return true;
  });
}

export function getParticipantColor(sender: string, participants: string[]): string {
  const colors = [
    '#e17076', '#7bc862', '#e5c07b', '#6ec9cb',
    '#ee7aae', '#e09b65', '#65aadd', '#a695e7',
  ];
  const index = participants.indexOf(sender);
  return colors[index % colors.length];
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
