export const getMonth = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  return {
    year,
    month,
  };
};

export const areMonthsEqual = (month1, month2) => {
  return month1.year === month2.year && month1.month === month2.month;
};

const shortMonths = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const displaySelectedMonthAndYear = (monthObject) => {
  return `${shortMonths[monthObject.month]} ${monthObject.year}`;
};
