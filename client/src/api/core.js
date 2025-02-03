import axios from "axios";

const protocol = window.location.protocol;
const host = window.location.host;

const axiosInstance = axios.create({
  baseURL:
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api"
      : `${protocol}//${host}/api`,
});

export const fetchSubjects = () => {
  return axiosInstance({
    method: "get",
    url: "subjects/",
  }).then((res) => res.data);
};

export const fetchQuetions = ({ subject_id = "", level_id = "" }) => {
  return axiosInstance({
    params: {
      subject_id,
      level_id,
    },
    method: "get",
    url: "questions/",
  }).then((res) => res.data);
};

export const fetchQuetion = ({ question_id = "" }) => {
  return axiosInstance({
    method: "get",
    url: `questions/${question_id}/`,
  }).then((res) => res.data);
};

export const checkAnswer = ({ question_id, user_answer = "" }) => {
  return axiosInstance({
    method: "post",
    url: "user_answers/",
    data: {
      question_id,
      user_answer,
    },
  }).then((res) => res.data);
};
