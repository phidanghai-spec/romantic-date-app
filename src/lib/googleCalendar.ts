/**
 * Google Calendar 1-Click URL Generator with Timezone Offset Precision
 * Accurately handles late-night rollovers past midnight.
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

  const startYear = parseInt(yearStr, 10) || new Date().getFullYear();
  const startMonth = (parseInt(monthStr, 10) || (new Date().getMonth() + 1)) - 1;
  const startDay = parseInt(dayStr, 10) || new Date().getDate();
  const startHour = parseInt(hourStr, 10) || 19;
  const startMin = parseInt(minStr, 10) || 0;

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
