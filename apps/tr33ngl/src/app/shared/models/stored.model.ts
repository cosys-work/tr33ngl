export interface Storable<T> {
  add: (t: Partial<T>) => T;
  get: () => T;
}
