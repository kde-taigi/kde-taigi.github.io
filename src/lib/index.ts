export function ensureArray<T>(it: T[] | T): T[] {
  return Array.isArray(it) ? it : [it];
}
