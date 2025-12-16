import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStoredAuth } from "../services/authenticationService";
import { setAuthFromStorage } from "../redux/auth/authSlice";
import { fetchCurrent } from "../redux/users/usersOperations";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = getStoredAuth();
    if (!stored?.token) return;
    // Set token & user from storage to bootstrap app
    dispatch(setAuthFromStorage({ token: stored.token, user: stored.user }));
    // Then refresh the current user from API to ensure freshness
    dispatch(fetchCurrent());
  }, [dispatch]);

  return children;
}
