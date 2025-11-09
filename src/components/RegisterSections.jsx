import { Link, useNavigate } from "react-router-dom";
import GoogleLogo from "../assets/googleimg.png";
import AppleLogo from "../assets/appleimg.png";
import FacebookLogo from "../assets/facebookimg.png";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { clearErrors, clearSuccessMessage, registerAction } from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "lucide-react";

export const RegisterBody = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, successMessage, error,url } = useSelector((state) => state.auth);
  // input state
  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //   is registering state
  const [isRegistering, setIsRegistering] = useState(false);
  //   set input state func.
  const handleInputChange = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  //   register func.
  const handleRegister = async (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !inputState.name ||
      !inputState.email ||
      !inputState.password ||
      !inputState.confirmPassword
    ) {
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
      setIsRegistering(true);
      await dispatch(
        registerAction({
          name: inputState.name,
          email: inputState.email,
          password: inputState.password,
        })
      );
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  // listen for success message & errors
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      if(url){
        navigate(url);
      }return
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
    <main className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full rounded-3xl px-6 sm:p-8 ">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Create your account</h2>
          <p className="text-sm text-gray-600 mt-2">
            Join Aura and start small daily growth.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full name</label>
            <input
              name="name"
              type="text"
              value={inputState.name}
              className="w-full p-3 border  rounded-lg"
              placeholder="Your name"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={inputState.email}
              className="w-full p-3 border  rounded-lg"
              placeholder="you@example.com"
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={inputState.password}
                className="w-full p-3 border  rounded-lg"
                placeholder="Create password"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm</label>
              <input
                type="password"
                name="confirmPassword"
                value={inputState.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-3 border  rounded-lg"
                placeholder="Confirm password"
              />
            </div>
            {/* password match error */}
          </div>
          {inputState.password !== inputState.confirmPassword && (
            <p className="text-red-500 text-sm mt-1 col-span-2">
              Passwords do not match
            </p>
          )}
          <button
            disabled={isRegistering || loading}
            type="submit"
            className="w-full bg-green-400 text-white py-4 rounded-3xl font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2  duration-300"
          >
            {isRegistering || loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing up...
              </div>
            ) : (
              <div className="flex items-center">
                <LogIn className="h-4 w-4 mr-2" />
                Sign up
              </div>
            )}
          </button>

          <div className="flex items-center justify-center gap-3 text-gray-500">
            <hr className="w-24" />
            <span className="text-xs">Or sign up with</span>
            <hr className="w-24" />
          </div>

          <div className="flex items-center justify-center gap-4 mt-2">
            <button
              type="button"
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-3"
            >
              <img src={GoogleLogo} alt="Google" className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-3"
            >
              <img src={AppleLogo} alt="Apple" className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-3"
            >
              <img src={FacebookLogo} alt="Facebook" className="w-6 h-6" />
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-(--aura-primary) font-semibold"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
