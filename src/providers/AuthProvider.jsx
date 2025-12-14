import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStoredAuth } from "../services/authenticationService";
import { setAuthFromStorage } from "../redux/auth/authSlice";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = getStoredAuth();
    if (!stored?.token) return;

    dispatch(setAuthFromStorage({ token: stored.token, user: stored.user }));
  }, [dispatch]);

  return children;
}
