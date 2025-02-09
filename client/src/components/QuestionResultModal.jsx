import { number2percentage } from "../utils/functions";

// eslint-disable-next-line react-refresh/only-export-components
export const toggleQuestionResultModal = () =>
  document.getElementById("question_result_modal").click();

export const QuestionResultModal = ({ result }) => {
  const normResult = number2percentage(result);
  return (
    <>
      <input
        type="checkbox"
        id="question_result_modal"
        className="modal-toggle"
      />
      <div id="question_result_modal" className="modal" role="dialog">
        <div className="modal-box">
          <div
            className={
              normResult < 50
                ? "bg-error text-error-content"
                : normResult >= 50 && normResult < 80
                ? "bg-warning text-warning-content"
                : "bg-success text-success-content"
            }
          >
            <h3 className="text-xl font-semibold p-3 text-center">
              Sizning javobingiz to'g'ri javobga {normResult}% ga o'xshash.
            </h3>
          </div>
          <div className="flex gap-3 mt-3">
            <button
              type="button"
              className="btn btn-warning"
              onClick={toggleQuestionResultModal}
            >
              Yopish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
