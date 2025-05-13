import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

export const Context = React.createContext();

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(
    localStorage.getItem("isAuthorized") === "true"
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Save to localStorage whenever user or auth state changes
  useEffect(() => {
    localStorage.setItem("isAuthorized", isAuthorized);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [isAuthorized, user]);

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<AppWrapper />);
