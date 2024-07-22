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

export function getDayAndDate(dateString: string) {
  const date = new Date(dateString);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  return `${day} ${dayOfWeek}`;
}

export function isValidISO8601(dateString: string): boolean {
  return iso8601Regex.test(dateString);
}

const iso8601Regex =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:[+-]\d{2}:\d{2}|Z)$/;
