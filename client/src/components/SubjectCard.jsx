import { FaBook } from "react-icons/fa";

export const SubjectCard = ({
  data,
  onBegin = () => {},
  onBeginQuiz = () => {},
}) => {
  return (
    <div className="card w-96 shadow-xl bg-base-100">
      <figure className="px-10 pt-10">
        <FaBook className="text-9xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title capitalize">{data.name}</h2>
        <p>Savollar soni: {data.questions_count} ta</p>
        <div className="card-actions">
          <button onClick={onBeginQuiz} className="btn btn-primary">
            Ochiq testlar
          </button>
          <button onClick={onBegin} className="btn btn-primary">
            Yopiq testlar
          </button>
        </div>
      </div>
    </div>
  );
};
