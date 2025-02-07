import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router";

export const QuestionCard = ({ data, link }) => {
  return (
    <div className="card card-side bg-base shadow-xl relative">
      <div className="absolute top-[-0.5rem] left-[-0.5rem] p-2 rounded-md bg-primary text-primary-content">
        <FaQuestion className="text-4xl " />
      </div>
      <div className="card-body mt-10">
        <h2 className="card-title">{data.title}</h2>
        <div className="card-actions justify-end">
          <Link to={link} className="btn btn-primary">
            Javob berish
          </Link>
        </div>
      </div>
    </div>
  );
};
