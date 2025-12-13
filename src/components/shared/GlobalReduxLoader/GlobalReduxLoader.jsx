import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

const GlobalReduxLoader = () => {
  const isGlobalLoading = useSelector((state) =>
    Object.values(state || {}).some(
      (slice) =>
        slice && typeof slice === "object" && slice.status === "loading"
    )
  );
  if (!isGlobalLoading) return null;
  return (
    <div
      style={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 1000 }}
    >
      <Loader />
    </div>
  );
};

export default GlobalReduxLoader;
