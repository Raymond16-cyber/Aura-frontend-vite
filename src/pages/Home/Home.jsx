import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import { motion } from "framer-motion";
import logo from "../../assets/applogo.png";
import leaderboardLogo from "../../assets/leaderboardpic.png";
import womanSmiling from "../../assets/womanSmiling.png";
import { Heart, Menu, Rocket, Smile } from "lucide-react";

const featureList = [
  {
    icon: <Heart size={28} className="text-(--aura-primary)" />,
    title: "Track Micro-Habits",
    desc: "Build consistency by winning small — daily streaks, visual progress, confetti.",
  },
  {
    icon: <Smile size={28} className="text-(--aura-primary)" />,
    title: "Emotional Wellness",
    desc: "Capture feelings and energy levels with quick check-ins.",
  },
  {
    icon: <Rocket size={28} className="text-(--aura-primary)" />,
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

  return (
    <div className="relative min-h-screen font-inter overflow-x-hidden bg-gradient-to-b from-purple-50 via-white to-purple-50">
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
            <div className="w-16 h-16 sm:w-12 sm:h-12 bg-(--aura-primary) flex items-center justify-center rounded-full">
              <img
                src={logo}
                alt="Aura Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-(--aura-primary) text-4xl font-bold">Aura</p>
          </Link>
          

          {/* menu button */}
          <div className="menBtn bg-(--aura-primary)/20 p-2 rounded-lg hover:bg-(--aura-primary)/40 transition-colors duration-300">
          <Menu />

          </div>
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
          <h1 className="text-5xl md:text-6xl font-bold text-(--aura-primary) leading-tight">
            Calm. Focus. Growth.
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-xl">
            Aura helps you build micro-habits, track emotional wellness, and
            stay motivated — without pressure.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              to="/waitlist"
              className="px-6 py-3 rounded-2xl bg-(--aura-primary) text-white font-semibold shadow-xl hover:scale-105 transition-all"
            >
              Join Waitlist 🚀
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-2xl bg-white text-(--aura-primary) font-semibold shadow-lg hover:scale-105 transition-all"
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

      {/* Social Proof */}
      <section className="py-10 bg-white/60 backdrop-blur-xl border-y relative z-10">
        <p className="text-center text-gray-600 text-sm">
          Already 2 users joined
        </p>
        <div className="flex justify-center gap-4 mt-3">
          <div className="w-8 h-8 bg-purple-300 rounded-full" />
          <div className="w-8 h-8 bg-purple-400 rounded-full" />
          <div className="w-8 h-8 bg-purple-500 rounded-full" />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-(--aura-primary)">
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
              <h3 className="text-xl font-semibold text-(--aura-primary)">{f.title}</h3>
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
          <h3 className="text-2xl font-semibold text-(--aura-primary)">
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
      <section className="text-center py-24 bg-(--aura-primary) text-white relative z-10">
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
          className="mt-8 inline-block px-8 py-4 bg-white text-(--aura-primary) rounded-2xl font-bold shadow-xl hover:scale-105 transition-all"
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
