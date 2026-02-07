export function getDateWithOffset(days: number): string {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);

  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();

  return `${month}-${day}-${year}`;
}
