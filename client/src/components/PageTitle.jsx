import { Link } from "react-router";

export const PageTitle = ({
  isLoading = false,
  isFetching = false,
  title = "Yuklanmoqda...",
  breadcrumbs = [],
}) => {
  return (
    <div className="p-5">
      <h2 className="lg:text-4xl text-xl font-semibold first-letter:capitalize">
        {title}
      </h2>
      {!isLoading && isFetching && <span>Yangilanmoqda...</span>}
      {isLoading && <span>Yuklanmoqda...</span>}

      {breadcrumbs.length > 0 && (
        <div className="breadcrumbs text-sm mt-2">
          <ul>
            <li>
              <Link to={"/"}>Sohalar</Link>
            </li>
            {breadcrumbs?.map((b, i) => (
              <li key={i}>
                {b?.link ? <Link to={b?.link}>{b.name}</Link> : b.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
