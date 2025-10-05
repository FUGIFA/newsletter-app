export function getStr(fd: FormData, key: string): string | null {
  const v = fd.get(key);
  if (typeof v !== "string") return null;
  const s = v.trim();
  return s.length ? s : null;
}

export function getBool(fd: FormData, key: string): boolean {
  const v = fd.get(key);
  if (typeof v !== "string") return false;
  const s = v.toLowerCase();
  return s === "true" || s === "1" || s === "on" || s === "yes";
}

export function getDate(fd: FormData, key: string): Date | null {
  const v = fd.get(key);
  if (typeof v !== "string" || !v.trim()) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

export function toDateOrNull(value: Date | string | null): Date | null {
  if (!value) return null;
  if (value instanceof Date && !isNaN(value.getTime())) return value;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}