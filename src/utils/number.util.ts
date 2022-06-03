export function generateRandomInteger(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export function isNumeric(value: any): boolean {
  const pattern = /^[-+]?[0-9]+$/;

  return pattern.test(value);
}
