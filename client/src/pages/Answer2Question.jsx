import { useMutation } from "@tanstack/react-query";
import { checkAnswer } from "../api/exam";
import { PageTitle } from "../components/PageTitle";
import {
  QuestionResultModal,
  toggleQuestionResultModal,
} from "../components/QuestionResultModal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/functions";

const PASS_SCORE = 0.5;

const Answer2Question = () => {
  const [data, setData] = useState(getLocalStorage("data"));
  const [currentResult, setCurrentResult] = useState(0);
  const { question_data, scores, user } = data;
  const currectQuestion = question_data[scores.length].questions.find(
    (q) => q.score === null
  );

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    mutate,
    data: resultData,
    isPending: isPending,
    isIdle,
  } = useMutation({
    mutationKey: ["checkAnswer", currectQuestion.id],
    mutationFn: () =>
      checkAnswer({
        question_id: currectQuestion.id,
        user_id: user.id,
        user_answer: getValues("user_answer"),
      }).then((response) => {
        setCurrentResult(response.score);
        setData((p) => {
          const currentQuestionSet = question_data[scores.length];

          if (response.score >= currentQuestionSet.max_score)
            currentQuestionSet.max_score = response.score;

          currentQuestionSet.questions = currentQuestionSet.questions.map((q) =>
            q.id === currectQuestion.id
              ? {
                  ...currectQuestion,
                  user_answer: getValues("user_answer"),
                  score: response.score,
                }
              : q
          );

          p.question_data = question_data.map((qs, i) =>
            i === scores.length ? currentQuestionSet : qs
          );

          if (response.score >= PASS_SCORE) {
            const level = currectQuestion.level.code;
            scores.push(level === 1 ? 10 : level === 2 ? 8 : 6);
          } else if (
            !currentQuestionSet.questions.find((q) => q.score === null)
          ) {
            scores.push(0);
          }

          setLocalStorage("data", {
            ...p,
            scores,
          });

          if (scores.length === question_data.length) {
            window.location.replace(`/my_results`);
            return;
          }

          setValue("user_answer", "");

          return {
            ...p,
            scores,
          };
        });
      }),
  });

  const onSubmit = () => {
    mutate();
    toggleQuestionResultModal();
  };
  return (
    <>
      <QuestionResultModal result={currentResult} />
      <PageTitle
        isFetching={false}
        isLoading={false}
        title={"Savolga javob yozing"}
        breadcrumbs={[
          {
            name: data?.subject?.name || "Savollar",
          },
          {
            name: "Savolga javob yozish",
          },
        ]}
      />
      <div className="lg:p-10 sm:p-3 md:p-5">
        <div className="join mb-3">
          {question_data.map((_, index) => (
            <button
              className={`btn btn-sm ${
                scores.length >= index && "btn-primary"
              } join-item`}
              key={index}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-sm">
            Savol darajasi: {currectQuestion.level.code}
          </p>
          <h4 className="first-letter:capitalize text-xl font-semibold">
            {currectQuestion?.title}
          </h4>
          <textarea
            {...register("user_answer", {
              required: true,
            })}
            rows={4}
            placeholder="Javob yozing..."
            className="textarea textarea-primary w-full"
          ></textarea>
          {errors.user_answer && (
            <span className="text-sm text-error">Javob yozing</span>
          )}
          <div className="flex gap-2 items-center">
            <button type="submit" className="btn btn-primary">
              Javobni yuborish va tekshirish
            </button>
            {isPending ? (
              <span className="text-primary loading loading-spinner loading-lg"></span>
            ) : !isIdle ? (
              <div className="text-success font-semibold">
                <div>
                  Kosinus o'xshashligi:{" "}
                  {Math.round((resultData?.cosine_similarity || 0) * 1000) /
                    1000}
                </div>
                <div>
                  BLEU o'xshashligi:{" "}
                  {Math.round((resultData?.bleu_similarity || 0) * 1000) / 1000}
                </div>
                <div>
                  Jaccard o'xshashligi:{" "}
                  {Math.round((resultData?.jaccard_similarity || 0) * 1000) /
                    1000}
                </div>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
};

export default Answer2Question;
