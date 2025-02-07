import { getUser } from "../utils/functions";

export const PrivatePage = ({ children }) => {
  const user = getUser();
  if (user?.firstname && user?.lastname) return children;
  else
    return (
      <div className="p-5">
        <h1 className="text-2xl">Taqiqlangan</h1>
      </div>
    );
};
