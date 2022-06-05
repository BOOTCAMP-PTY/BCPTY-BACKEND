declare global {
  interface String {
    capitalizeFirst(): string;
  }
}

export function capitalizeFirst(value: string): string {
  return `${value.toString().toLowerCase().charAt(0).toUpperCase()}${value
    .toString()
    .toLowerCase()
    .slice(1)}`;
}

String.prototype.removeSlashAtBeginning = function () {
  return capitalizeFirst(this);
};

export function generateRandomString(length: number): string {
  return Math.random()
    .toString(36)
    .replace(/[^a-zA-Z0-9]+/g, '')
    .toUpperCase()
    .substr(0, length);
}
