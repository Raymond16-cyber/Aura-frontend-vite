import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearSuccessMessage, resetPasswordAction } from "../../store/actions/auth";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage, error } = useSelector((state) => state.auth);
  //   extract token from params
  const { search } = useLocation();
  const token = new URLSearchParams(search).get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password.trim()) {
      toast.error("Password cannot be empty.");
      return;
    }
    await dispatch(resetPasswordAction(token, password));
    setLoading(true);
    toast.success("Please wait while we reset your password.");
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
    <div className="min-h-screen bg-(--aura-bg) flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-white shadow-md rounded-3xl p-8"
      >
        <h1 className="text-2xl font-bold text-(--aura-accent)">
          Reset Password
        </h1>
        <p className="mt-2 text-gray-600">
          Enter your new password. Make sure it's strong and unique.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <input
            type="password"
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--aura-accent)"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleReset}
            disabled={loading}
            className={`w-full py-3 rounded-2xl font-semibold bg-(--aura-accent)  hover:brightness-90 transition-all ${
              loading && "opacity-60 cursor-not-allowed"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>

        <p className="text-center text-sm mt-6 text-gray-600">
          Remembered your password?{" "}
          <Link to="/auth/login" className="text-(--aura-primary) font-medium">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
