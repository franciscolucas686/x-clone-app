const moths = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export function formatJoinedDate(dateStr: string): string {
  if (!dateStr) return "";
  const [, month, year] = dateStr.split("/").map(Number);
  return `${moths[month - 1]} de ${year}`;
}
