export function debounce<P extends Array<any>>(
  func: (...params: P) => void,
  wait: number
) {
  let timeout: number | undefined;

  return (...params: P) => {
    const later = () => {
      timeout = undefined;
      func(...params);
    };

    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
}
