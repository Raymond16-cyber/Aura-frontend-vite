import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { ArrowRight, Eye, EyeClosed, LogIn, Mail, Star } from "lucide-react";
import { motion } from "framer-motion";
import GoogleLogo from "../../assets/googleimg.png";
import AppleLogo from "../../assets/appleimg.png";
import FacebookLogo from "../../assets/facebookimg.png";
import {
  clearErrors,
  clearSuccessMessage,
  loginAction,
} from "../../store/actions/auth";

export const LoginBody = () => {
  // redux dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, successMessage, error, myInfo, isAuthenticated } =
    useSelector((state) => state.auth);
  // input state
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  //   password visibility state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  //   is logging in state
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  //   set input state func.
  const handleInputChange = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  //   toggle password visibility func.
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  //   onlogin func.
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!inputState.email || !inputState.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputState.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setIsLoggingIn(true);
      await dispatch(loginAction(inputState));
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // listen for success message & errors
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
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

  // listen for authentication state change
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--aura-bg) p-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-(--aura-primary) flex items-center justify-center text-white">
            <LogIn className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-(--aura-accent)">
              Continue Your Journey
            </h2>
            <p className="text-sm text-gray-600">
              Track progress, stay motivated.
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={inputState.email}
              onChange={handleInputChange}
              disabled={isLoggingIn || loading}
              placeholder="example@gmail.com"
              className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--aura-primary) ${
                isLoggingIn || loading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed placeholder-gray-400"
                  : "text-black"
              }`}
            />
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              id="password"
              value={inputState.password}
              onChange={handleInputChange}
              disabled={isLoggingIn || loading}
              placeholder="Enter your password"
              className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--aura-primary)"
            />
            {isPasswordVisible ? (
              <EyeClosed
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                size={20}
                onClick={togglePasswordVisibility}
              />
            ) : (
              <Eye
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                size={20}
                onClick={togglePasswordVisibility}
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="w-4 h-4"
                disabled={isLoggingIn || loading}
              />
              <span>Remember me</span>
            </label>
            <Link
              to={"/auth/forgetpassword"}
              className="text-(--aura-primary) text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            disabled={isLoggingIn || loading}
            type="submit"
            className="w-full bg-(--aura-primary) text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {isLoggingIn || loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center">
                <LogIn className="w-4 h-4 mr-2" /> Sign in
              </div>
            )}
          </button>

          <div className="flex items-center gap-3 my-2">
            <hr className="flex-1" />
            <span className="text-sm text-gray-500">Or continue with</span>
            <hr className="flex-1" />
          </div>

          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={() => toast("Google placeholder")}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2"
            >
              <img src={GoogleLogo} alt="Google" className="w-5 h-5" />
              <span className="text-sm">Google</span>
            </button>
            <button
              type="button"
              onClick={() => toast("Facebook placeholder")}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2"
            >
              <img src={FacebookLogo} alt="Facebook" className="w-5 h-5" />
              <span className="text-sm">Facebook</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export const LoginFooter = () => {
  return (
    <div className="loginFooter flex justify-center items-center gap-2 mt-6 mb-10">
      <p className="font-medium">Don't have an account?</p>
      <Link to={"/auth/register"} className="text-(--aura-primary) font-bold">
        SignUp
      </Link>
    </div>
  );
};
