export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

export const generateUniqueId = (seed) => {
  const enc = new TextEncoder();
  const arr = enc.encode(seed);
  let values = '';
  for (const i of window.crypto.getRandomValues(arr)) {
    values += i;
  }

  return Number(values);
};
