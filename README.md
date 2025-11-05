# Aura — Mental Wellness & Journaling App

Aura is a mental health companion designed to help teens and young adults track emotions, journal daily moods, and build better habits. Unlike ordinary habit or journaling apps, Aura focuses on small emotional progress — one day at a time.

---

## 🌟 Features

* ✅ Authentication (Register, Login) — secure & email verified
* ✅ Daily mood tracking
* ✅ Guided journaling prompts
* ✅ Custom toast notifications using **Sonner + Framer Motion** animations
* ✅ Fully responsive UI designed with Tailwind CSS
* ✅ Secure backend with Node.js, Express & MongoDB
* ✅ Email provider using Nodemailer (Welcome + Verification emails)

---

## 🧠 Tech Stack

**Frontend:**

* React + Redux Toolkit
* React Router
* Tailwind CSS / Framer Motion
* Sonner (Custom Toast UI)

**Backend:**

* Node.js + Express.js
* MongoDB + Mongoose
* Nodemailer (Email service)

**Others:**

* JWT Authentication
* Environment variables via .env

---

## 🛠️ Installation

Clone the repo:

```bash
git clone https://github.com/yourusername/aura.git
cd aura
```

Install dependencies for frontend and backend:

```bash
# Frontend
yarn install   # or npm install

# Backend
cd server
yarn install   # or npm install
```

---

## 🚀 Run Aura Locally

```bash
# Backend
yarn dev

# Frontend
cd client
yarn dev
```

Frontend runs on: `http://localhost:5173`
Backend runs on: `http://localhost:5000`

---

## 🔐 Environment Variables (.env)

Create a `.env` file in **server** directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM="Aura <your_email@gmail.com>"
```

---

## 📧 Email Notifications

Aura supports:

* ✉️ Welcome Emails
* ✅ Email Verification

All templates are generated dynamically using Nodemailer + custom HTML.

---

## 📂 Folder Structure

```
aura/
 ├── client/      # React Frontend
 └── server/      # Express Backend
```

---

## 🧪 Coming Soon

* AI Emotion Insight (Generate emotional reports)
* Streak rewards
* Dark mode

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 📄 License

MIT © 2025 Aura
