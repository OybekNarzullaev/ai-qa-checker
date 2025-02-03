export const Loader = ({ title = "Yuklanmoqda..." }) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-2 text-primary">
        <span className="loading loading-spinner loading-lg"></span>
        <span>{title}</span>
      </div>
    </div>
  );
};
