import { useState } from "react";
import { getLocalStorage } from "../utils/functions";
import { PageTitle } from "../components/PageTitle";
import { Link } from "react-router";

const MyQuizResults = () => {
  const [data] = useState(getLocalStorage("data"));
  const score = data.scores.reduce((a, b) => a + b);
  const grade = Math.round((score / (data.scores.length * 10)) * 5);
  return (
    <>
      <PageTitle
        isFetching={false}
        isLoading={false}
        title={"Natijalar"}
        breadcrumbs={[
          {
            name: data?.subject?.name || "Savollar",
          },
          {
            name: "Natijalar",
          },
        ]}
      />
      <div className="flex justify-center">
        <div className="card bg-base-100 min-w-96 shadow-xl">
          <div className="card-body">
            <div
              className={`flex border-2 border-black dark:text-black ${
                grade < 3
                  ? "bg-red-400"
                  : grade === 3
                  ? "bg-yellow-400"
                  : grade === 4
                  ? "bg-sky-400"
                  : "bg-green-400"
              }`}
            >
              <div className="font-semibold p-3 flex-1">
                <p>Fan</p>
                <h3 className="lg:text-xl text-md">{data.subject.name}</h3>
              </div>
              <div className="font-semibold p-3 flex-1 border-x-2 border-black">
                <p>Talaba</p>
                <h3 className="lg:text-xl text-md">{data.user.fullname}</h3>
              </div>
              <div className="font-semibold p-3 flex-1">
                <p>Baho</p>
                <h3 className="lg:text-xl text-md">
                  {grade}({score}/{data.scores.length * 10} ball)
                </h3>
              </div>
            </div>
            <div>
              {data.question_data.map((qs, index) => (
                <div key={index}>
                  <div className="font-semibold">
                    {index + 1}. Ball: {data.scores[index]}
                  </div>
                  <br />

                  <div className="pl-6">
                    {qs.questions
                      .filter((q) => q.score !== null)
                      .map((q) => (
                        <div key={q.id} className="mb-2">
                          <span className="font-semibold">
                            {q.level.code} - qiyinlik darajasi.
                          </span>{" "}
                          {q.title}
                          <div>
                            <span className="font-semibold">
                              Sizning javobingiz:
                            </span>{" "}
                            {q.user_answer}{" "}
                            {q.score === 0 ? (
                              <span className="btn text-white btn-xs btn-error">
                                Noto'g'ri
                              </span>
                            ) : (
                              <span className="btn text-white btn-xs btn-success">
                                To'g'ri
                              </span>
                            )}
                          </div>
                          {q.score === 0 && (
                            <div>
                              <span className="font-semibold">
                                To'g'ri javob:
                              </span>{" "}
                              {q.answers.find((a) => a.is_true).title}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                  <div className="divider"></div>
                </div>
              ))}
            </div>
            <div className="card-actions justify-end">
              <Link to={"/"} className="btn btn-primary">
                Bosh sahifa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyQuizResults;
