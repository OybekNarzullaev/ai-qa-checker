import axios from "axios";

const protocol = window.location.protocol;
const host = window.location.host;

export const axiosInstance = axios.create({
  baseURL:
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api"
      : `${protocol}//${host}/api`,
});

export const fetchSubjects = async () => {
  return axiosInstance({
    method: "get",
    url: "subjects/",
  }).then((res) => res.data);
};
