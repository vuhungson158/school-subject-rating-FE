export {}
declare global {
  interface Array<T> {
    remove(value: T): Array<T>;
  }
}

if (!Array.prototype.remove) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.remove = function <T>(value: T) {
    return this.filter((filterValue: T) => filterValue !== value);
  }
}

