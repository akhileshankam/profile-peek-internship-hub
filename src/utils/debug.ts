export const DEBUG = import.meta.env ? import.meta.env.DEV : process.env.NODE_ENV !== 'production';

export function debugLog(...args: any[]) {
  if (DEBUG) {
    console.log(...args);
  }
}
