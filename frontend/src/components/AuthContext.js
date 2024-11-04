import React, { createContext, useState, useEffect } from "react";
import axios from 'axios'
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
      setToken(storedToken);
  })
  return (
    <AuthContext.Provider value={{ token, setToken  }}>
      {children}
    </AuthContext.Provider>
  );
};