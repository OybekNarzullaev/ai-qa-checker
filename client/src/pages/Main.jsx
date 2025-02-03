import { useQuery } from "@tanstack/react-query";
import { SubjectCard } from "../components/SubjectCard";
import { fetchSubjects } from "../api/core";
import { Loader } from "../components/Loader";
import { PageTitle } from "../components/PageTitle";

const Main = () => {
  const {
    data = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });
  return (
    <>
      <PageTitle
        isFetching={isFetching}
        isLoading={isLoading}
        title="Sohalar"
      />
      <div className="lg:p-10 sm:p-3 md:p-5 flex flex-wrap items-center">
        {isLoading && <Loader title="Sohalar yuklanmoqda..." />}
        {data?.map((s) => (
          <SubjectCard
            link={`/subject_questions?subject_id=${s.id}`}
            data={s}
            key={s.id}
          />
        ))}
      </div>
    </>
  );
};

export default Main;
