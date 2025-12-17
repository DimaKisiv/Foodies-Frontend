import React, { createContext, useContext, useState, useCallback } from "react";
import SignInModal from "../components/Modals/SignInModal/SignInModal.jsx";
import SignUpModal from "../components/Modals/SignUpModal/SignUpModal.jsx";

const AuthModalContext = createContext(null);

export function AuthModalProvider({ children }) {
  const [authModal, setAuthModal] = useState(null); // 'signin' | 'signup' | null
  const [authModalEmail, setAuthModalEmail] = useState("");

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

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return ctx;
}
