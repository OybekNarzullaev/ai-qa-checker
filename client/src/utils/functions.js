export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  const k = localStorage.getItem(key);
  if (k) return JSON.parse(localStorage.getItem(key));
  return undefined;
};

export const number2percentage = (number = 0) => {
  return Math.round(number * 10000) / 100;
};
