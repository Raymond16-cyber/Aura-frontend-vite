import React, { useEffect } from "react";
import { toast } from "sonner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  clearSuccessMessage,
  verifyEmailAction,
} from "../../../store/actions/auth";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage, error } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const token = new URLSearchParams(search).get("token");

  const handleVerify = async () => {
    await dispatch(verifyEmailAction(token));
    toast.success("Verifying… please wait ✨");
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      navigate("/auth/login");
      return;
    } else if (error) {
      toast.error(error);
    }
  }, [successMessage, error, navigate]);

  useEffect(() => {
    return () => dispatch(clearSuccessMessage());
  }, [dispatch,successMessage]);

  useEffect(() => {
    return () => dispatch(clearErrors());
  }, [dispatch,error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10 bg-gradient-to-b from-(--aura-bg) to-(--aura-bg2)">
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-white/70 backdrop-blur-lg shadow-xl border border-white/30 animate-fade-in">
        {/* Aura icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-(--aura-accent)/10 flex items-center justify-center">
            <span className="text-(--aura-accent) text-3xl font-bold">✨</span>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-center text-(--aura-primary)">
          Verify your email
        </h1>
        <p className="text-center mt-2 text-gray-600">
          We sent a secure verification link to your email.
          <br />
          Click the button below to confirm your account.
        </p>

        {/* action button */}
        <button
          onClick={handleVerify}
          className="mt-7 w-full py-3 rounded-xl font-semibold bg-(--aura-accent) shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
        >
          Verify Email
        </button>

       
        <div className="mt-6 text-center text-sm">
          <Link to="/auth/login" className="text-(--aura-primary) underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
