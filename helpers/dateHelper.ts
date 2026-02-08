export function getDateWithOffset(days: number): string {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);

  const day = String(currentDate.getDate());
  const month = String(currentDate.getMonth() + 1);
  const year = currentDate.getFullYear();

  return `${month}-${day}-${year}`;
}
