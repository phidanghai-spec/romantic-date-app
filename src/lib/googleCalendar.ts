/**
 * Google Calendar 1-Click URL Generator with Timezone Offset Precision
 */

export interface GoogleCalendarOptions {
  title: string;
  description?: string;
  location?: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationHours?: number;
}

export function generateGoogleCalendarUrl({
  title,
  description = 'Buổi hẹn hò ngọt ngào do hai đứa cùng lên kế hoạch 💖',
  location = 'Trung tâm Sài Gòn',
  startDate,
  startTime,
  durationHours = 3,
}: GoogleCalendarOptions): string {
  const cleanDate = (startDate || new Date().toISOString().split('T')[0]).replace(/-/g, '');
  const [hours, minutes] = (startTime || '19:00').split(':');
  const startHourNum = parseInt(hours, 10) || 19;
  const startMinNum = parseInt(minutes, 10) || 0;

  const startHourStr = String(startHourNum).padStart(2, '0');
  const startMinStr = String(startMinNum).padStart(2, '0');

  const endHourNum = Math.min(23, startHourNum + durationHours);
  const endHourStr = String(endHourNum).padStart(2, '0');
  const endMinStr = startMinStr;

  const dtStart = `${cleanDate}T${startHourStr}${startMinStr}00`;
  const dtEnd = `${cleanDate}T${endHourStr}${endMinStr}00`;
  const datesParam = `${dtStart}/${dtEnd}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: datesParam,
    details: description,
    location: location,
    ctz: 'Asia/Ho_Chi_Minh',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
