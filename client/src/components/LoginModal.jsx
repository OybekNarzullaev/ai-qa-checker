import { useForm } from "react-hook-form";
import { setUser } from "../utils/functions";

// eslint-disable-next-line react-refresh/only-export-components
export const toggleLoginModal = () =>
  document.getElementById("login_modal").click();

export const LoginModal = ({ onBegin }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setUser(getValues("firstname"), getValues("lastname"));
    onBegin();
  };
  return (
    <>
      <input type="checkbox" id="login_modal" className="modal-toggle" />
      <div id="login_modal" className="modal" role="dialog">
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
              <button type="submit" className="btn btn-primary">
                Boshlash
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={toggleLoginModal}
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
