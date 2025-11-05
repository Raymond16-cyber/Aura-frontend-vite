import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { ArrowRight, Eye, EyeClosed, LogIn, Mail, Star } from "lucide-react";
import GoogleLogo from "../../assets/googleimg.png";
import AppleLogo from "../../assets/appleimg.png";
import FacebookLogo from "../../assets/facebookimg.png";
import { loginAction } from "../../store/actions/auth";

export const LoginBody = () => {
  // redux dispatch
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
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

  return (
    <div className="Loginbody flex flex-col gap-8 mt-10 ">
      <div className="flex flex-col px-20 items-center">
        <h2 className=" font-bold text-3xl">Continue Your Journey </h2>
        <p>Track progress, stay motivated.</p>
      </div>
      {/* form */}
      <div className="loginForm">
        <form onSubmit={handleLogin} className=" px-8">
          {/* Entries */}
          <div className="inputEntries flex flex-col gap-6">
            {/* email entry */}
            <div className="emailEntry">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email{" "}
              </label>

              {/* Email input X icon */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`
    rounded w-full p-3 border rounded-lg
    focus:outline-none focus:ring-2 focus:ring-transparent
    ${
      isLoggingIn || loading
        ? "bg-gray-100 text-gray-400 cursor-not-allowed placeholder-gray-400"
        : "text-black"
    }
  `}
                  placeholder="example@gmail.com"
                  value={inputState.email}
                  onChange={handleInputChange}
                  disabled={isLoggingIn || loading}
                />

                <Mail
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-default"
                  size={20}
                />
              </div>
            </div>
            {/* password entry */}
            <div className="passwordEntry">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>

              {/* password input X icon */}
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={inputState.password}
                  id="password"
                  className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-transparent"
                  placeholder="Nhsj@#34rt"
                  onChange={handleInputChange}
                  disabled={isLoggingIn || loading}
                />
                {isPasswordVisible ? (
                  <EyeClosed
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    size={20}
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <Eye
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    size={20}
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Remember Section */}
          <div className="rememberSection flex items-center justify-between mt-4">
            <div className="rememberMe flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="w-4 h-4"
                disabled={isLoggingIn || loading}
              />
              <label htmlFor="remember" className="font-medium">
                Remember Me
              </label>
            </div>
            <div className="forgotPassword">
              <Link
                to={"/auth/forgetpassword"}
                className="text-(--aura-primary) font-medium"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Login button */}
          <div className="loginButton mt-8">
            <button
              disabled={isLoggingIn || loading}
              type="submit"
              className="w-full bg-green-400 text-white py-4 rounded-3xl font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2  duration-300"
            >
              {isLoggingIn || loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign in
                </div>
              )}
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 text-gray-500 mb-6">
            <hr className=" w-32" />
            <span>Or Continue With</span>
            <hr className=" w-32" />
          </div>

          {/* Other login options */}
          <div className="LoginOptions mt-8 flex justify-center gap-6">
            {/* Google */}
            <div className="googleImg bg-white border border-gray-200 shadow-sm rounded-xl p-3 hover:shadow-md transition cursor-pointer">
              <img src={GoogleLogo} alt="Google" className="w-6 h-6" />
            </div>

            {/* Apple */}
            <div className="appleImg bg-white border border-gray-200 shadow-sm rounded-xl p-3 hover:shadow-md transition cursor-pointer">
              <img src={AppleLogo} alt="Apple" className="w-6 h-6" />
            </div>

            {/* Facebook */}
            <div className="facebookImg bg-white border border-gray-200 shadow-sm rounded-xl p-3 hover:shadow-md transition cursor-pointer">
              <img src={FacebookLogo} alt="Facebook" className="w-6 h-6" />
            </div>
          </div>
        </form>
      </div>
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
