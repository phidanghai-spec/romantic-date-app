/**
 * RFC 5545 iCalendar (.ics) Generator for Couple Date Invitations
 * Accurately handles midnight hours (00:xx), date rollovers, and Vietnam Timezone (Asia/Ho_Chi_Minh).
 *
 * Manual Verification Test Cases:
 * 1. startTime = "00:00" -> parsedHour: 0, startHour: 0 (not fallback 19)
 * 2. startTime = "00:30" -> parsedHour: 0, startHour: 0, startMin: 30
 * 3. startTime = "19:00" -> parsedHour: 19, startHour: 19, startMin: 0
 */

export interface ICSOptions {
  title: string;
  description?: string;
  location?: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationHours?: number; // Default: 3
}

function formatICSDate(dateObj: Date): string {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  const h = String(dateObj.getHours()).padStart(2, '0');
  const min = String(dateObj.getMinutes()).padStart(2, '0');
  const s = String(dateObj.getSeconds()).padStart(2, '0');
  return `${y}${m}${d}T${h}${min}${s}`;
}

export function generateICSContent({
  title,
  description = 'Buổi hẹn hò lãng mạn của hai đứa mình 💕',
  location = 'Trung tâm thành phố',
  startDate,
  startTime,
  durationHours = 3,
}: ICSOptions): string {
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

  const dtStart = formatICSDate(startDateObj);
  const dtEnd = formatICSDate(endDateObj);
  const nowStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `date-${Date.now()}-${Math.random().toString(36).substring(2, 8)}@ourdatenight.app`;

  // Escape special chars in text fields
  const safeTitle = title.replace(/\n/g, ' ').trim();
  const safeDesc = description.replace(/\n/g, '\\n').trim();
  const safeLoc = location.replace(/\n/g, ' ').trim();

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Our Date Night//Romantic Date Planner//VI',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Ho_Chi_Minh',
    'X-LIC-LOCATION:Asia/Ho_Chi_Minh',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0700',
    'TZOFFSETTO:+0700',
    'TZNAME:ICT',
    'DTSTART:19700101T000000',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowStamp}`,
    `DTSTART;TZID=Asia/Ho_Chi_Minh:${dtStart}`,
    `DTEND;TZID=Asia/Ho_Chi_Minh:${dtEnd}`,
    `SUMMARY:${safeTitle}`,
    `DESCRIPTION:${safeDesc}`,
    `LOCATION:${safeLoc}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Nhắc nhở: Sắp đến giờ hẹn hò lãng mạn rồi nhé! 🌸',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
