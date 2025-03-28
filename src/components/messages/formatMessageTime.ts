export const formatMessageTime = (createdAt: string): string => {
  const date = new Date(createdAt);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // Just now (0-1 minute ago)
  if (diffInMinutes < 1) {
    return "Just now";
  }

  // Minutes ago (1-59 minutes ago)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  // Today - show only time (e.g., "11:45 AM")
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Yesterday - show "Yesterday" with time (e.g., "Yesterday 9:30 PM")
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  // Within last 7 days - show day name with time (e.g., "Tuesday 2:15 PM")
  if (diffInDays <= 7) {
    return `${date.toLocaleDateString([], { weekday: 'long' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  // Older than 7 days - show date with time (e.g., "Mar 15, 2:30 PM")
  return date.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};