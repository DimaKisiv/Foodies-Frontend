import { Link, useLocation } from "react-router-dom";
import css from "./Breadcrumbs.module.css";

/**
 * trail: optional array of { label, to? }
 * - If provided, renders these entries instead of deriving from URL.
 * - Last item renders as plain text.
 */
const Breadcrumbs = ({ trail }) => {
  const location = useLocation();

  const derived = location.pathname.split("/").filter(Boolean);

  const items =
    trail && Array.isArray(trail) && trail.length > 0
      ? trail
      : derived.map((value, index) => {
          const to = `/${derived.slice(0, index + 1).join("/")}`;
          return { label: decodeURIComponent(value), to };
        });

  return (
    <nav aria-label="breadcrumbs">
      <ul className={css["breadcrumbs"]}>
        <li className={css["breadcrumbs-item"]}>
          <Link className={css["breadcrumbs-link"]} to="/">
            HOME
          </Link>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const label = String(item.label || "").toUpperCase();
          return (
            <li key={item.to || label} className={css["breadcrumbs-group"]}>
              <span className={css["breadcrumbs-separator"]} aria-hidden="true">
                /
              </span>
              {isLast || !item.to ? (
                <span className={css["breadcrumbs-current"]}>{label}</span>
              ) : (
                <Link className={css["breadcrumbs-link"]} to={item.to}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
