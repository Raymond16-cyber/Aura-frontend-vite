import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  clearSuccessMessage,
  forgotPasswordAction,
} from "../../store/actions/auth";
import { useLocation, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, successMessage, error, url } = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Please enter a valid email");
    }

    await dispatch(forgotPasswordAction(email));
  };

  

  // listen for success message & errors
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      if (url) {
        navigate(url);
      }
      return;
    } else if (error) {
      toast.error(error);
    }
  }, [successMessage, error, navigate]);

  // listen for clear success message on component unmount
  useEffect(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch, successMessage]);
  // listen for clear errors on component unmount
  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch, error]);
  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10 bg-gradient-to-b from-(--aura-bg) to-(--aura-bg2)">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md p-8 rounded-3xl bg-white/70 backdrop-blur-lg shadow-xl border border-white/30 animate-fade-in"
      >
        {/* Aura Logo Circle */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-(--aura-accent)/10 flex items-center justify-center">
            <span className="text-(--aura-accent) text-3xl font-bold">🔒</span>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-center text-(--aura-primary)">
          Forgot Password?
        </h1>

        <p className="text-center mt-2 text-gray-600 leading-relaxed">
          Don’t worry — it happens.
          <br />
          Enter your email and we’ll send a secure reset link.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/80 border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-(--aura-accent) outline-none transition-all"
          />

          <button
            type="submit"
            className="w-full bg-(--aura-accent)  py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Send Reset Link
          </button>
        </div>

        <p className="mt-6 text-center text-sm">
          <a
            href="/auth/login"
            className="text-(--aura-primary) underline hover:opacity-80"
          >
            Back to Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default ForgetPassword;
