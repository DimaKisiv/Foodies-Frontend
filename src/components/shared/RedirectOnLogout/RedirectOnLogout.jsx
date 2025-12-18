import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../../redux/auth/authSlice";

export default function RedirectOnLogout() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const prevAuth = useRef(isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect on transition from authenticated -> unauthenticated
    if (prevAuth.current && !isAuthenticated) {
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
    }
    prevAuth.current = isAuthenticated;
  }, [isAuthenticated, navigate, location.pathname]);

  return null;
}
