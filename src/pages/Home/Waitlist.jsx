import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { joinWaitlistAction } from "../../store/actions/waitlist";
import { clearErrors, clearSuccessMessage } from "../../store/actions/auth";
import applogo from "../../assets/applogo.png";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const JoinWaitlist = () => {
  const dispatch = useDispatch();
  const { successMessage, success, error, referralCode, waitlistPosition } =
    useSelector((state) => state.waitlist);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [referralCodeInput, setReferralCodeInput] = useState(null);
  const [urlReferralCode, setUrlReferralCode] = useState(null);
  const [loading, setLoading] = useState(false);

  // in case there's a referral code, extract from URL
  const { search } = useLocation();
  const refCode = new URLSearchParams(search).get("ref");
  useEffect(() => {
    if (refCode) {
      console.log("Referral code from URL:", refCode);
      setUrlReferralCode(refCode);
    }
  }, [refCode]);

  const handleJoin = async () => {
    if (!fullName.trim()) return toast.error("Name cannot be empty");
    if (!email.trim()) return toast.error("Email cannot be empty");

    if (referralCodeInput && !/^AURA-\w{6}$/.test(referralCodeInput.trim())) {
      return toast.error(
        "Invalid referral code format. It should be like AURA-XXXXXX"
      );
    }

    setLoading(true);
    try {
      dispatch(
        joinWaitlistAction({
          fullName: fullName.trim(),
          email: email.trim(),
          referralCode:
            referralCodeInput?.trim() || urlReferralCode?.trim() || null,
        })
      );

      //   setFullName("");
      //   setEmail("");
      //   setReferralCodeInput("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (successMessage) {
      const data = `${successMessage}!\n\nYour referral code: ${referralCode}\nYour position on the waitlist: ${waitlistPosition}\n\nShare your referral code to move up the waitlist faster!`;
      navigator.clipboard.writeText(data);
      toast.success(data);
      return;
    } else if (error) {
      toast.error(error);
    }
  }, [successMessage, error]);

  useEffect(() => {
    return () => dispatch(clearSuccessMessage());
  }, [dispatch, successMessage]);

  useEffect(() => {
    return () => dispatch(clearErrors());
  }, [dispatch, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--aura-bg) dark:bg-gray-900 p-4 text-sm">
      {success ? (
        <div className="w-full max-w-lg p-10 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-white/50 dark:border-gray-700 text-center">
          <h1 className="text-2xl font-bold text-(--aura-primary) dark:text-(--aura-primary-dark) mb-4">
            Thank you for joining the Aura Waitlist!
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            You've successfully joined the waitlist. Your referral code and
            waitlist position have been copied to your clipboard.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Share your referral code to move up the waitlist faster!
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-(--aura-primary) dark:bg-white bg-black text-white rounded-xl hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] dark:text-black hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all duration-300"
          >
            <ArrowLeft className="mr-2" />
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-lg p-10 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-white/50 dark:border-gray-700">
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-16 sm:w-12 sm:h-12 bg-(--aura-primary) dark:bg-(--aura-primary-dark) flex items-center justify-between rounded-full">
              <img
                src={applogo}
                alt="Aura Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-(--aura-primary) dark:text-(--aura-primary-dark) text-center">
            Join Aura Waitlist
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
            Be one of the first to access Aura. Earn rewards by sharing your
            referral code.
          </p>

          {/* FULL NAME */}
          <div className="">
            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Full name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John David"
              className="
          w-full p-4 rounded-xl
          border border-gray-300 dark:border-gray-600 outline-none
          focus:ring-4 focus:ring-(--aura-primary)/40
          transition-all duration-200 text-black dark:text-white bg-white dark:bg-gray-700
        "
            />
          </div>

          {/* EMAIL */}
          <div className="mt-5">
            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="
          w-full p-4 rounded-xl
          border border-gray-300 dark:border-gray-600 outline-none
          focus:ring-4 focus:ring-(--aura-primary)/40
          transition-all duration-200 text-black dark:text-white bg-white dark:bg-gray-700
        "
            />
          </div>

          {/* OPTIONAL REFERRAL */}
          <div className="mt-4">
            <label className="block mb-2 text-gray-600 dark:text-gray-400">
              Referral code{" "}
              <span className="text-sm text-gray-400 dark:text-gray-500">
                (optional)
              </span>
            </label>
            <input
              type="text"
              value={referralCodeInput || urlReferralCode}
              onChange={(e) => setReferralCodeInput(e.target.value)}
              readOnly={!!urlReferralCode}
              placeholder="AURA-XXXXXX (optional)"
              className="
          w-full p-3 rounded-xl
          border border-gray-200 dark:border-gray-600 outline-none
          focus:ring-2 focus:ring-(--aura-primary)/30
          transition-all duration-200 text-black dark:text-white bg-white dark:bg-gray-700
        "
            />
          </div>

          <button
            onClick={handleJoin}
            disabled={loading}
            className={`
        w-full mt-6 py-4 rounded-xl font-semibold
        bg-(--aura-primary) dark:bg-(--aura-primary-dark)
        shadow-[0_0_15px_rgba(99,102,241,0.4)]
        hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]
        transition-all duration-300
        hover:scale-[1.02]
        ${loading ? "opacity-60 cursor-not-allowed" : ""}
      `}
          >
            {loading ? "Joining……" : "Join Waitlist 🚀"}
          </button>

          <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            We'll send updates to your email. You can unsubscribe anytime.
          </p>

          <Link
            to="/"
            className="flex items-center justify-center text-center hover:underline"
          >
            <ArrowLeft className="text-(--aura-primary) dark:text-(--aura-primary-dark) pt-2" />
            <p className="text-(--aura-primary) dark:text-(--aura-primary-dark) pt-2">
              Go to Dashboard
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default JoinWaitlist;
