import { FaBook } from "react-icons/fa";
import { Link } from "react-router";

export const SubjectCard = ({ data, link }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <FaBook className="text-9xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title capitalize">{data.name}</h2>
        <p>Savollar soni: {data.questions_count} ta</p>
        <div className="card-actions">
          <Link to={link} className="btn btn-primary">
            Boshlash
          </Link>
        </div>
      </div>
    </div>
  );
};
