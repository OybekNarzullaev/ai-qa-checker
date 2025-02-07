import { useQuery } from "@tanstack/react-query";
import { SubjectCard } from "../components/SubjectCard";
import { fetchSubjects } from "../api/core";
import { Loader } from "../components/Loader";
import { PageTitle } from "../components/PageTitle";
import { LoginModal, toggleLoginModal } from "../components/LoginModal";
import { useState } from "react";

const Main = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState(undefined);
  const {
    data = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  const onBegin = () => {
    window.location.replace(`/answer2question?subject_id=${selectedSubjectId}`);
  };
  return (
    <>
      <PageTitle
        isFetching={isFetching}
        isLoading={isLoading}
        title="Sohalar"
      />
      <LoginModal onBegin={onBegin} />
      <div className="lg:p-10 sm:p-3 md:p-5 flex flex-wrap items-center">
        {isLoading && <Loader title="Sohalar yuklanmoqda..." />}
        {data?.map((s) => (
          <SubjectCard
            onBegin={() => {
              toggleLoginModal();
              setSelectedSubjectId(s.id);
            }}
            data={s}
            key={s.id}
          />
        ))}
      </div>
    </>
  );
};

export default Main;
