export const getMonthName = (monthNumber: number): string => {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber - 1] || "Invalid month";
};

export function getDayAndDate(dateString:string) {
  const date = new Date(dateString);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  return `${day} ${dayOfWeek}`;
}





