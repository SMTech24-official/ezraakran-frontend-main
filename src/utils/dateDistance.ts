import { formatDistanceToNow } from 'date-fns';
import { format } from 'date-fns';

export function smartDateFormatter(
  date: Date | number | string,
  options?: {
    /** When true, shows "today" instead of "0 days" */
    showToday?: boolean;
    /** Threshold in days to switch to absolute date (default: 7) */
    thresholdDays?: number;
    /** Date format for distant dates (default: "d MMM yyyy") */
    dateFormat?: string;
  }
): string {
  const now = new Date();
  const inputDate = typeof date === 'string' ? new Date(date) : new Date(date);
  const diffInDays = Math.floor((inputDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const {
    showToday = true,
    thresholdDays = 7,
    dateFormat = 'd MMM yyyy' // e.g., "15 Mar 2025"
  } = options || {};

  if (showToday && diffInDays === 0) {
    return 'today';
  }

  if (Math.abs(diffInDays) <= thresholdDays) {
    return formatDistanceToNow(inputDate, { addSuffix: true });
  }

  return format(inputDate, dateFormat);
}