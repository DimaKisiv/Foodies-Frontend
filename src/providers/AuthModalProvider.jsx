import React, { useState, useCallback, useEffect, useRef } from "react";
import SignInModal from "../components/Modals/SignInModal/SignInModal.jsx";
import SignUpModal from "../components/Modals/SignUpModal/SignUpModal.jsx";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../redux/auth/authSlice";
import { AuthModalContext } from "./authModalContext";

export function AuthModalProvider({ children }) {
  const [authModal, setAuthModal] = useState(null); // 'signin' | 'signup' | null
  const [authModalEmail, setAuthModalEmail] = useState("");
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const prevAuth = useRef(isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  const openSignIn = useCallback((email = "") => {
    setAuthModalEmail(email || "");
    setAuthModal("signin");
  }, []);

  const openSignUp = useCallback((email = "") => {
    setAuthModalEmail(email || "");
    setAuthModal("signup");
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModal(null);
    setAuthModalEmail("");
  }, []);

  const value = {
    authModal,
    authModalEmail,
    openSignIn,
    openSignUp,
    closeAuthModal,
  };

  useEffect(() => {
    if (prevAuth.current && !isAuthenticated) {
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
    }
    prevAuth.current = isAuthenticated;
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <SignInModal
        isOpen={authModal === "signin"}
        onClose={closeAuthModal}
        defaultEmail={authModalEmail}
        onSwitchToSignUp={openSignUp}
      />
      <SignUpModal
        isOpen={authModal === "signup"}
        onClose={closeAuthModal}
        defaultEmail={authModalEmail}
        onSwitchToSignIn={openSignIn}
      />
    </AuthModalContext.Provider>
  );
}

// useAuthModal moved to providers/useAuthModal.js to improve Fast Refresh
