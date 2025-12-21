import { Link, useLocation } from "react-router-dom";
import css from "./Breadcrumbs.module.css";

const Breadcrumbs = () => {
    const location = useLocation();

    const pathnames = location.pathname
        .split("/")
        .filter(Boolean);

    return (
        <nav aria-label="breadcrumbs">
            <ul className={css["breadcrumbs"]}>
                <li className={css["breadcrumbs-item"]}>
                    <Link to="/">Home</Link>
                </li>

                <span className={css["breadcrumbs-separator"]}>/</span>

                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <li className={css["breadcrumbs-item"]} key={to}>
                            {isLast ? (
                                <span>{decodeURIComponent(value)}</span>
                            ) : (
                                <Link to={to}>{decodeURIComponent(value)}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
