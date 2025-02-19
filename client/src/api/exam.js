import { axiosInstance } from "./core";

export const startExamAPI = async ({
  firstname,
  lastname,
  subject_id,
  type_quiz = "",
}) => {
  return axiosInstance({
    method: "post",
    url: "start_exam/",
    data: {
      firstname,
      lastname,
      subject_id,
      type_quiz,
    },
  }).then((res) => res.data);
};

export const finishExamAPI = async ({ user_id, subject_id }) => {
  return axiosInstance({
    method: "post",
    url: "finish_exam/",
    data: {
      user_id,
      subject_id,
    },
  }).then((res) => res.data);
};

export const checkAnswer = async ({
  user_id,
  question_id,
  user_answer = "",
}) => {
  return axiosInstance({
    method: "post",
    url: "answer2question/",
    data: {
      question_id,
      user_id,
      user_answer,
    },
  }).then((res) => res.data);
};
