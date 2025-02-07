export const setUser = (firstname, lastname) => {
  const user = {
    firstname,
    lastname,
  };

  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
