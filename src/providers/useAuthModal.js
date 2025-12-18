import { useContext } from "react";
import { AuthModalContext } from "./authModalContext";

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return ctx;
}

export default useAuthModal;
