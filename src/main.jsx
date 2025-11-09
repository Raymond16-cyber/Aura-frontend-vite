import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./store/store.js";
import "./index.css";
import { Toaster } from "sonner";
import "aos/dist/aos.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          position="top-center"
          expand
          duration={1800}
          closeButton
          visibleToasts={3}
          offset={12}
          toastOptions={{
            className:
              "rounded-2xl bg-white shadow-lg border border-gray-200 p-4",
            duration: 2600,
            style: {
              animationDuration: "250ms",
            },
          }}
        />
        

        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
