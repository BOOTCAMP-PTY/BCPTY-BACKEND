export function getAge(birthdate: Date | string | number): number {
  return Math.floor(
    (new Date().getTime() - new Date(birthdate).getTime()) / 3.15576e10,
  );
}
