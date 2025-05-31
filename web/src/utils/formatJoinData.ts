export function formatJoinDate(dateString: string) {
   const date = new Date(dateString);
   const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
   return `Joined ${date.toLocaleString('en-US', options)}`;
}
