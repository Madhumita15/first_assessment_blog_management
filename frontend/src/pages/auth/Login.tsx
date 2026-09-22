import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LoginInput } from "../../services/json/inputsData/login.input";
import DynamicInput from "../../components/DynamicInput";
import { CircularProgress } from "@mui/material";
import { LoginSchema } from "../../validation/login.validation";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { login } from "../../store/slices/user.slice";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSeletor((state) => state.user);

  const {
    formState: { errors },
    handleSubmit,
    reset,
    register,
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await dispatch(login(data)).unwrap();
      console.log("fresponse from login page", response);
      if (response.success === true) {
        toast.success(response.message);
        if (response.data.role === "admin") {
          navigate("/admin/adminBlogmanagement");
        } else {
          navigate("/user/userBlogmanagement");
        }

        reset({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50/50 to-purple-50 px-4">
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-200/50 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-200/50 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-100/40 blur-3xl" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 flex w-full max-w-md flex-col gap-4 rounded-2xl border border-violet-100 bg-white/85 p-8 shadow-2xl shadow-violet-100/70 backdrop-blur-xl sm:p-10"
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-violet-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>

          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H3m0 0l4-4m-4 4l4 4m6-9V5a2 2 0 012-2h3a2 2 0 012 2v14a2 2 0 01-2 2h-3a2 2 0 01-2-2v-2"
              />
            </svg>
          </div>

          <div className="mb-4 text-center">
            <h3 className="bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Welcome to our Platform
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Login to access your dashboard
            </p>
          </div>

          {LoginInput.map((input) => (
            <DynamicInput
              label={input.label}
              type={input.type}
              required={input.required}
              errors={errors}
              register={register}
              name={input.name}
              loading={loading.login}
            />
          ))}

          {/* Login Button */}
          <button
            disabled={loading.login}
            type="submit"
            className="mt-3 w-full rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-3 font-bold text-white shadow-lg shadow-violet-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 hover:shadow-xl hover:shadow-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading.login ? (
              <CircularProgress size={24} sx={{ color: "#ffffff" }} />
            ) : (
              "Login"
            )}
          </button>

          <h1 className="text-center">
            Create An Account?{" "}
            <button onClick={() => navigate("/register")}>Register</button>
          </h1>
        </form>
      </div>
    </>
  );
};

export default Login;
