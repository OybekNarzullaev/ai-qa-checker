import { useForm } from "react-hook-form";
import { setLocalStorage } from "../utils/functions";
import { useMutation } from "@tanstack/react-query";
import { startExamAPI } from "../api/exam";

// eslint-disable-next-line react-refresh/only-export-components
export const toggleLoginModalQuiz = () =>
  document.getElementById("login_modal_quiz").click();

export const LoginModalQuiz = ({ subjectId }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { isPending, mutate } = useMutation({
    mutationKey: [
      "start examp",
      subjectId,
      getValues("firstname"),
      getValues("lastname"),
    ],
    mutationFn: () =>
      startExamAPI({
        firstname: getValues("firstname"),
        lastname: getValues("lastname"),
        type_quiz: "open",
        subject_id: subjectId,
      }).then((data) => {
        setLocalStorage("user", data.user);
        setLocalStorage("data", { ...data, scores: [] });
        window.location.replace(`/answer2quizquestion`);
      }),
  });

  const onSubmit = () => {
    mutate();
  };
  return (
    <>
      <input type="checkbox" id="login_modal_quiz" className="modal-toggle" />
      <div id="login_modal_quiz" className="modal" role="dialog">
        <div className="modal-box">
          <div className="bg-primary text-primary-content">
            <h3 className="text-xl font-semibold p-3 text-center">
              O'zingizni tanishtiring
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-3">
            <div className="flex gap-3 flex-col">
              <h4 className="text-lg">Ismingiz va familiyangiz</h4>
              <input
                {...register("firstname", {
                  required: true,
                })}
                placeholder="Ismingiz"
                type="text"
                className="input input-primary w-full"
              />
              {errors.firstname && (
                <span className="text-sm text-error">Ismingizni yozing</span>
              )}
              <input
                {...register("lastname", {
                  required: true,
                })}
                placeholder="Familiyangiz"
                type="text"
                className="input input-primary w-full"
              />
              {errors.lastname && (
                <span className="text-sm text-error">Familyangizni yozing</span>
              )}
            </div>
            <div className="flex gap-3 mt-3">
              <button
                disabled={isPending}
                type="submit"
                className="btn btn-primary"
              >
                Boshlash
              </button>
              <button
                disabled={isPending}
                type="button"
                className="btn btn-warning"
                onClick={toggleLoginModalQuiz}
              >
                Bekor qilish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
