// utils.ts ou utils.js (dependendo de como seu projeto está configurado)
export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
