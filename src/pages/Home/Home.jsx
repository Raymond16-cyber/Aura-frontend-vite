import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import { motion } from "framer-motion";
import logo from "../../assets/applogo.png";
import leaderboardLogo from "../../assets/leaderboardpic.png";
import womanSmiling from "../../assets/womanSmiling.png";
import { Heart, Menu, Rocket, Smile, Sun, Moon } from "lucide-react";
import SideBar from "./SideBar";

const featureList = [
  {
    icon: <Heart size={28} className="text-[var(--aura-primary)]" />,
    title: "Track Micro-Habits",
    desc: "Build consistency by winning small — daily streaks, visual progress, confetti.",
  },
  {
    icon: <Smile size={28} className="text-[var(--aura-primary)]" />,
    title: "Emotional Wellness",
    desc: "Capture feelings and energy levels with quick check-ins.",
  },
  {
    icon: <Rocket size={28} className="text-[var(--aura-primary)]" />,
    title: "Referral Rewards",
    desc: "Invite friends, climb the leaderboard, unlock early access.",
  },
];

const FloatingBlob = ({ className, style }) => (
  <motion.div
    animate={{ y: [0, -15, 0] }}
    transition={{
      duration: 4 + Math.random() * 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`absolute rounded-full opacity-40 ${className}`}
    style={style}
  />
);

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (dark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {
      // ignore
    }
  }, [dark]);

  return (
    <div className="relative min-h-screen font-inter overflow-x-hidden  from-purple-50 via-white to-purple-50">
      {/* Floating blobs */}
      <FloatingBlob
        className="w-48 h-48 bg-purple-300"
        style={{ top: "10%", left: "5%" }}
      />
      <FloatingBlob
        className="w-36 h-36 bg-pink-300"
        style={{ top: "60%", right: "10%" }}
      />
      <FloatingBlob
        className="w-24 h-24 bg-indigo-300"
        style={{ top: "40%", left: "50%" }}
      />

      {/* Navbar */}
      <header className="w-full py-6 sticky top-0 bg-white/30 backdrop-blur-lg z-30 border-b border-white/20">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-16 h-16 sm:w-12 sm:h-12 bg-[var(--aura-primary)] flex items-center justify-center rounded-full">
              <img
                src={logo}
                alt="Aura Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[var(--aura-primary)] text-4xl font-bold dark:text-[var(--aura-foreground)]">
              Aura
            </p>
          </Link>
          <button
            onClick={() => setDark((d) => !d)}
            aria-pressed={dark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="mr-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
         
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center gap-14 max-w-6xl mx-auto px-6 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--aura-primary)] leading-tight">
            Calm. Focus. Growth.
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-xl">
            Aura helps you build micro-habits, track emotional wellness, and
            stay motivated — without pressure.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              to="/waitlist"
              className="px-6 py-3 rounded-2xl bg-[var(--aura-primary)] text-white font-semibold shadow-xl hover:scale-105 transition-all"
            >
              Join Waitlist 🚀
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-2xl bg-white text-[var(--aura-primary)] font-semibold shadow-lg hover:scale-105 transition-all"
            >
              Sign In
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center relative"
        >
          <img
            src={womanSmiling}
            alt="Aura Emotional Wellness"
            className="w-full max-w-lg drop-shadow-2xl rounded-xl"
          />
        </motion.div>
      </section>

      {/* Proof / Social Validation */}
      <section className="py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--aura-primary)]">
                Loved by people building better days
              </h2>
              <p className="mt-3 text-gray-600 max-w-lg">
                Real users, real progress — Aura helps people form tiny habits
                that add up. See what members are saying.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="bg-white rounded-full px-4 py-2 shadow-sm">
                  <p className="text-sm text-gray-500">Avg. rating</p>
                  <p className="font-semibold text-[var(--aura-primary)]">
                    4.8 / 5
                  </p>
                </div>
                <div className="bg-white rounded-full px-4 py-2 shadow-sm">
                  <p className="text-sm text-gray-500">Active users</p>
                  <p className="font-semibold text-[var(--aura-primary)]">
                    +300
                  </p>
                </div>
              </div>
            </div>

            <div
              className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="p-5 bg-white rounded-2xl shadow-md">
                <p className="text-sm text-gray-700">
                  "I finally stuck to a 5-minute wind-down routine. My sleep
                  improved in two weeks."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center font-semibold text-[var(--aura-primary)]">
                    JS
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Janelle S.</p>
                    <p className="text-xs text-gray-500">
                      Daily user · 3 months
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="p-5 bg-white rounded-2xl shadow-md"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <p className="text-sm text-gray-700">
                  "The mood check-ins help me notice patterns. It's gentle and
                  non-judgmental."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center font-semibold text-[var(--aura-primary)]">
                    RM
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Ramon M.</p>
                    <p className="text-xs text-gray-500">
                      Weekly user · 6 months
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="p-5 bg-white rounded-2xl shadow-md"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <p className="text-sm text-gray-700">
                  "Small wins keep me motivated. The streak visuals are
                  delightful."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center font-semibold text-[var(--aura-primary)]">
                    AL
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Alicia L.</p>
                    <p className="text-xs text-gray-500">Daily user · 1 year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Aura is Different (value bullets) */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--aura-primary)]">
          Why Aura is different
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="p-6 bg-white rounded-2xl shadow-md"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-md bg-[var(--aura-primary)]/10 flex items-center justify-center">
                <Heart size={20} className="text-[var(--aura-primary)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--aura-primary)]">
                  Micro-habits, big results
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Tiny, consistent actions are easier to keep — Aura focuses on
                  small wins, streaks, and gentle nudges.
                </p>
              </div>
            </div>
          </div>

          <div
            className="p-6 bg-white rounded-2xl shadow-md"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-md bg-[var(--aura-primary)]/10 flex items-center justify-center">
                <Smile size={20} className="text-[var(--aura-primary)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--aura-primary)]">
                  Emotional wellness first
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Quick check-ins and mood tracking help users understand
                  patterns and respond with compassion, not pressure.
                </p>
              </div>
            </div>
          </div>

          <div
            className="p-6 bg-white rounded-2xl shadow-md"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-md bg-[var(--aura-primary)]/10 flex items-center justify-center">
                <Rocket size={20} className="text-[var(--aura-primary)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--aura-primary)]">
                  Simple, human-centered design
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  No jargon, no heavy tracking — just a friendly experience that
                  helps people feel supported while building habits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community / Emotional Connection */}
      <section
        className="max-w-6xl mx-auto px-6 py-16 relative z-10"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-[var(--aura-primary)]">
              You’re not alone
            </h3>
            <p className="mt-2 text-gray-600">
              Join a gentle community focused on progress, not perfection.
              Support, celebrate, and grow together.
            </p>
          </div>

          <div className="flex-1 flex items-center gap-3 justify-end">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-300 border-2 border-white" />
              <div className="w-10 h-10 rounded-full bg-pink-300 border-2 border-white" />
              <div className="w-10 h-10 rounded-full bg-indigo-300 border-2 border-white" />
              <div className="w-10 h-10 rounded-full bg-yellow-300 border-2 border-white" />
            </div>
            <div className="ml-4 text-right">
              <p className="text-sm text-gray-500">
                +300 users building habits together
              </p>
              <Link
                to="/waitlist"
                className="mt-2 inline-block px-4 py-2 bg-[var(--aura-primary)] text-white rounded-xl font-semibold"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--aura-primary)]">
          Why Aura?
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {featureList.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: 1 }}
              data-aos="fade-up"
              data-aos-delay={200 * i}
              className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-start gap-4"
            >
              {f.icon}
              <h3 className="text-xl font-semibold text-[var(--aura-primary)]">
                {f.title}
              </h3>
              <p className="mt-2 text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          data-aos="zoom-in"
          className="rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl p-10 text-center"
        >
          <h3 className="text-2xl font-semibold text-[var(--aura-primary)]">
            Invite friends → move up the waitlist → unlock rewards
          </h3>
          <img
            src={leaderboardLogo}
            alt="Leaderboard"
            className="mx-auto mt-6 rounded-xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="text-center py-24 bg-[var(--aura-primary)] text-white relative z-10">
        <motion.h2
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-4xl font-bold"
        >
          Start small. Stay consistent.
        </motion.h2>
        <p className="mt-4 opacity-90">
          It's your journey — Aura just supports it.
        </p>

        <Link
          to="/waitlist"
          className="mt-8 inline-block px-8 py-4 bg-white text-[var(--aura-primary)] rounded-2xl font-bold shadow-xl hover:scale-105 transition-all"
        >
          Join Waitlist 🚀
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm relative z-10">
        © {new Date().getFullYear()} Aura. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
