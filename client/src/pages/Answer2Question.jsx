import { useMutation, useQuery } from "@tanstack/react-query";
import { checkAnswer, fetchQuetion } from "../api/core";
import { Loader } from "../components/Loader";
import { PageTitle } from "../components/PageTitle";
import { useSearchParams } from "react-router";
import { useForm } from "react-hook-form";

const Answer2Question = () => {
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("subject_id");
  const questionId = searchParams.get("question_id");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const {
    data = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["question", questionId],
    queryFn: () =>
      fetchQuetion({
        question_id: questionId,
      }),
  });

  const {
    mutate,
    data: resultData,
    isPending: isPending,
    isIdle,
  } = useMutation({
    mutationKey: ["checkAnswer"],
    mutationFn: () =>
      checkAnswer({
        question_id: questionId,
        user_answer: getValues("user_answer"),
      }),
  });

  const onSubmit = () => {
    mutate();
  };
  return (
    <>
      <PageTitle
        isFetching={isFetching}
        isLoading={isLoading}
        title={"Savolga javob yozing"}
        breadcrumbs={[
          {
            name: data?.subject?.name || "Savollar",
            link: `/subject_questions?subject_id=${subjectId}`,
          },
          {
            name: "Savolga javob yozish",
          },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="lg:p-10 sm:p-3 md:p-5">
        {isLoading && <Loader title="Sohalar yuklanmoqda..." />}
        <h4 className="first-letter:capitalize text-xl font-semibold">
          {data?.title}
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
            Tekshirish
          </button>
          {isPending ? (
            <span className="text-primary loading loading-spinner loading-lg"></span>
          ) : !isIdle ? (
            <div className="text-success font-semibold">
              <div>
                Kosinus o'xshashligi:{" "}
                {Math.round((resultData?.cosine_similarity || 0) * 1000) / 1000}
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
    </>
  );
};

export default Answer2Question;
