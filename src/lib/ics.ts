/**
 * RFC 5545 iCalendar (.ics) Generator for Couple Date Invitations
 * Handles local Vietnam Timezone (Asia/Ho_Chi_Minh) accurately without naive UTC shifts.
 */

export interface ICSOptions {
  title: string;
  description?: string;
  location?: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationHours?: number; // Default: 3
}

export function generateICSContent({
  title,
  description = 'Buổi hẹn hò lãng mạn của hai đứa mình 💕',
  location = 'Trung tâm thành phố',
  startDate,
  startTime,
  durationHours = 3,
}: ICSOptions): string {
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
