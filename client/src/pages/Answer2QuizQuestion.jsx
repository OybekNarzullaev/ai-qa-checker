import { PageTitle } from "../components/PageTitle";
import { useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/functions";
import { useForm } from "react-hook-form";

const Answer2QuizQuestion = () => {
  const [data, setData] = useState(getLocalStorage("data"));
  const [selectedAns, setSelectedAns] = useState(undefined);
  const { question_data, scores } = data;
  const currectQuestion = question_data[scores.length].questions.find(
    (q) => q.score === null
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onNext = () => {
    setData((p) => {
      const currentQuestionSet = question_data[scores.length];

      const is_correct = selectedAns.is_true;
      currentQuestionSet.questions = currentQuestionSet.questions.map((q) =>
        q.id === currectQuestion.id
          ? {
              ...currectQuestion,
              user_answer: selectedAns.title,
              score: is_correct ? 1 : 0,
            }
          : q
      );

      p.question_data = question_data.map((qs, i) =>
        i === scores.length ? currentQuestionSet : qs
      );

      if (is_correct) {
        const level = currectQuestion.level.code;
        scores.push(level === 1 ? 10 : level === 2 ? 8 : 6);
      } else if (!currentQuestionSet.questions.find((q) => q.score === null)) {
        scores.push(0);
      }

      setLocalStorage("data", {
        ...p,
        scores,
      });

      if (scores.length === question_data.length) {
        window.location.replace(`/my_quiz_results`);
        return;
      }

      setValue("answer", null);
      setSelectedAns(undefined);

      return {
        ...p,
        scores,
      };
    });
  };
  return (
    <>
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
      <div className="lg:p-10 sm:p-3 md:p-5 bg-base-100">
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
        <div>
          <p className="text-sm">
            Savol darajasi: {currectQuestion.level.code}
          </p>
          <h4 className="first-letter:capitalize text-xl font-semibold">
            {currectQuestion?.title}
          </h4>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onNext)}
            className="flex flex-col gap-3 mt-5"
          >
            {currectQuestion?.answers.map((a) => (
              <div key={a.id} className="flex items-center gap-2">
                <input
                  className="checkbox checkbox-primary"
                  name="answer"
                  type="checkbox"
                  {...register("answer", {
                    required: "Javobni belgilang",
                  })}
                  checked={selectedAns?.id === a.id}
                  onClick={() => setSelectedAns(a)}
                  id={`ans-${a.id}`}
                />{" "}
                <label htmlFor={`ans-${a.id}`}>{a.title}</label>
              </div>
            ))}
            {errors.answer && (
              <span className="text-sm text-error">
                {errors.answer.message}
              </span>
            )}
            <button
              type="submit"
              className={`btn ${
                scores.length + 1 === question_data.length
                  ? "btn-success text-white"
                  : "btn-primary"
              } w-fit mt-5`}
            >
              {scores.length + 1 === question_data.length
                ? "Tugatish"
                : "Keyingi"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Answer2QuizQuestion;
