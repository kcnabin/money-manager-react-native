export const getMonth = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  return {
    year,
    month,
  };
};

export const areMonthsEqual = (month1, month2) => {
  if (month1.year === month2.year && month1.month === month2.month) {
    return true;
  }
  return false;
};
