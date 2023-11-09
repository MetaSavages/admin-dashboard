export function getFirstObjectKey(obj) {
  if (typeof obj !== 'object' || obj == null || obj == undefined) {
    return null;
  } else {
    if (Object.keys(obj).length > 0) {
      const firstKey = Object.keys(obj)[0];
      return firstKey;
    } else {
      return null;
    }
  }
}
