export function removeSlashAtBeginning(path: string): string {
  return path.charAt(0) === '/' ? path.substr(1) : path;
}

export function removeSlashAtEnd(path: string): string {
  return path.charAt(path.length - 1) === '/'
    ? path.substr(0, path.length - 1)
    : path;
}

declare global {
  interface String {
    removeSlashAtBeginning(): string;
    removeSlashAtEnd(): string;
  }
}

String.prototype.removeSlashAtBeginning = function () {
  return removeSlashAtBeginning(this);
};
String.prototype.removeSlashAtEnd = function () {
  return removeSlashAtEnd(this);
};
