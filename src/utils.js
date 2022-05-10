export function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time);
  });
}