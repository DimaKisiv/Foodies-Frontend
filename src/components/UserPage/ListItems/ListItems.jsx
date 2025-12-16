// src/pages/UserPage/ListItems/ListItems.jsx
import styles from "./ListItems.module.css";
import { ListPagination } from "../ListPagination/ListPagination";

export function ListItems({
  title,
  items = [],
  renderItem,
  isLoading = false,
  error = null,

  page = 1,
  totalPages = 1,
  onPageChange,
}) {
  return (
    <section className={styles.section}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}

      {isLoading ? <div className={styles.state}>Loading…</div> : null}
      {error ? <div className={styles.stateError}>{String(error)}</div> : null}

      {!isLoading && !error && items.length === 0 ? (
        <div className={styles.state}>No items yet.</div>
      ) : null}

      <div className={styles.list}>
        {items.map((item) => (
          <div
            key={item.id ?? item._id ?? JSON.stringify(item)}
            className={styles.row}
          >
            {renderItem?.(item)}
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <ListPagination
          page={page}
          totalPages={totalPages}
          onChange={onPageChange}
        />
      </div>
    </section>
  );
}
