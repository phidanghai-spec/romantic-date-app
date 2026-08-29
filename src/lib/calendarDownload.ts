/**
 * Client-side helper to download RFC 5545 .ics Calendar files
 */

export function downloadICSFile(icsContent: string, filename = 'date_invitation.ics'): void {
  if (typeof window === 'undefined') return;

  try {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.endsWith('.ics') ? filename : `${filename}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    console.error('Error downloading .ics file:', error);
  }
}
