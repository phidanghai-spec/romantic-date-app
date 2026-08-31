/**
 * Google Calendar 1-Click URL Generator with Timezone Offset Precision
 * Accurately handles midnight hours (00:xx) and late-night rollovers past midnight.
 *
 * Manual Verification Test Cases:
 * 1. startTime = "00:00" -> parsedHour: 0, startHour: 0 (not fallback 19)
 * 2. startTime = "00:30" -> parsedHour: 0, startHour: 0, startMin: 30
 * 3. startTime = "19:00" -> parsedHour: 19, startHour: 19, startMin: 0
 */

export interface GoogleCalendarOptions {
  title: string;
  description?: string;
  location?: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationHours?: number;
}

function formatGCalDate(dateObj: Date): string {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  const h = String(dateObj.getHours()).padStart(2, '0');
  const min = String(dateObj.getMinutes()).padStart(2, '0');
  const s = String(dateObj.getSeconds()).padStart(2, '0');
  return `${y}${m}${d}T${h}${min}${s}`;
}

export function generateGoogleCalendarUrl({
  title,
  description = 'Buổi hẹn hò ngọt ngào do hai đứa cùng lên kế hoạch 💖',
  location = 'Trung tâm Sài Gòn',
  startDate,
  startTime,
  durationHours = 3,
}: GoogleCalendarOptions): string {
  const [yearStr, monthStr, dayStr] = (startDate || new Date().toISOString().split('T')[0]).split('-');
  const [hourStr, minStr] = (startTime || '19:00').split(':');

  const parsedYear = parseInt(yearStr, 10);
  const parsedMonth = parseInt(monthStr, 10);
  const parsedDay = parseInt(dayStr, 10);
  const parsedHour = parseInt(hourStr, 10);
  const parsedMin = parseInt(minStr, 10);

  // Use Number.isNaN check instead of || operator to avoid falsy zero bug for midnight hours (00:xx)
  const startYear = !Number.isNaN(parsedYear) && parsedYear > 0 ? parsedYear : new Date().getFullYear();
  const startMonth = !Number.isNaN(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12 ? parsedMonth - 1 : new Date().getMonth();
  const startDay = !Number.isNaN(parsedDay) && parsedDay >= 1 && parsedDay <= 31 ? parsedDay : new Date().getDate();
  const startHour = !Number.isNaN(parsedHour) && parsedHour >= 0 && parsedHour <= 23 ? parsedHour : 19;
  const startMin = !Number.isNaN(parsedMin) && parsedMin >= 0 && parsedMin <= 59 ? parsedMin : 0;

  // Build full start & end Date objects to handle multi-hour rollovers past midnight
  const startDateObj = new Date(startYear, startMonth, startDay, startHour, startMin, 0);
  const endDateObj = new Date(startDateObj.getTime() + durationHours * 60 * 60 * 1000);

  const dtStart = formatGCalDate(startDateObj);
  const dtEnd = formatGCalDate(endDateObj);
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
