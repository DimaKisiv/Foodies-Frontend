// src/pages/UserPage/ListPagination/ListPagination.jsx
import styles from "./ListPagination.module.css";

export function ListPagination({ page = 1, totalPages = 1, onChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <div className={styles.wrap}>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={p === page ? `${styles.btn} ${styles.active}` : styles.btn}
          onClick={() => onChange?.(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
