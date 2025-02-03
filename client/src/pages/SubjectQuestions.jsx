import { useSearchParams } from "react-router";
import { PageTitle } from "../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { fetchQuetions } from "../api/core";
import { Loader } from "../components/Loader";
import { QuestionCard } from "../components/QuestionCard";

const SubjectQuestions = () => {
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("subject_id");
  const {
    data = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["questions", subjectId],
    queryFn: () =>
      fetchQuetions({
        subject_id: subjectId,
      }),
  });
  return (
    <>
      <PageTitle
        isFetching={isFetching}
        isLoading={isLoading}
        title={data?.subject?.name || "Savollar"}
        breadcrumbs={[{ name: data?.subject?.name || "Savollar" }]}
      />
      <div className="lg:p-10 sm:p-3 md:p-5 flex flex-wrap items-center">
        {isLoading && <Loader title="Savollar yuklanmoqda..." />}
        {data?.questions?.map((q) => (
          <QuestionCard
            link={`/answer2question?subject_id=${q.subject.id}&question_id=${q.id}`}
            data={q}
            key={q.id}
          />
        ))}
      </div>
    </>
  );
};

export default SubjectQuestions;
