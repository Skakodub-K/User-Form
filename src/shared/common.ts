export const convertStringToDate = (date: string): Date => {
  const [day, month, year] = String(date).split(".").map(Number);
  return new Date(year, month, day + 1);
};
