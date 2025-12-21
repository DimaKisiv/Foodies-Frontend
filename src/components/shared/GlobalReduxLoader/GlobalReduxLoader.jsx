import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import styles from "./GlobalReduxLoader.module.css";

const GlobalReduxLoader = () => {
  const isGlobalLoading = useSelector((state) =>
    Object.values(state || {}).some(
      (slice) =>
        slice && typeof slice === "object" && slice.status === "loading"
    )
  );
  if (!isGlobalLoading) return null;
  return (
    <div className={styles.container}>
      <Loader />
    </div>
  );
};

export default GlobalReduxLoader;
