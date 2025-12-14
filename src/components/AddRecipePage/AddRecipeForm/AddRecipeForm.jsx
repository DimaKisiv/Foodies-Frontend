import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import styles from "./AddRecipeForm.module.css";
import { selectIsAuthenticated } from "../../../redux/auth/authSlice";

export default function AddRecipeForm() {
  const isAuth = useSelector(selectIsAuthenticated);
  if (!isAuth) return <Navigate to="/" replace />;

  // toggle to preview empty/filled UI
  const isFilled = false;

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* LEFT */}
        <div className={styles.left}>
          {!isFilled ? (
            <label className={`${styles.uploader} ${styles.uploaderEmpty}`}>
              <input
                className={styles.fileInput}
                type="file"
                accept="image/*"
              />
              <div className={styles.cameraWrap} aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 4.5h6l1.2 1.8H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8.3a2 2 0 0 1 2-2h2.8L9 4.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className={styles.uploadLink}>Upload a photo</span>
            </label>
          ) : (
            <div className={styles.previewBlock}>
              <div className={styles.previewFrame}>
                <img
                  className={styles.previewImg}
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1400&auto=format&fit=crop"
                  alt="Recipe preview"
                />
              </div>

              <label className={styles.uploadAnother}>
                <input
                  className={styles.fileInput}
                  type="file"
                  accept="image/*"
                />
                Upload another photo
              </label>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          {/* TITLE + DESCRIPTION */}
          <div className={styles.block}>
            <div className={styles.titleRow}>
              <h2 className={styles.heading}>THE NAME OF THE RECIPE</h2>
            </div>

            <input
              className={styles.titleInput}
              type="text"
              placeholder="Enter a name"
              defaultValue={isFilled ? "SALMON AVOCADO SALAD" : ""}
            />

            <div className={styles.textareaWrap}>
              <textarea
                className={styles.desc}
                placeholder="Enter a description of the dish"
                maxLength={200}
                defaultValue={
                  isFilled
                    ? "Is a healthy salad recipe that’s big on nutrients and flavor. A moist, pan seared salmon is layered on top of spinach, avocado, tomatoes, and red onions. Then drizzled with a homemade lemon vinaigrette."
                    : ""
                }
              />
              <span className={styles.counter}>
                {isFilled ? "45" : "0"}/200
              </span>
            </div>
          </div>

          {/* CATEGORY + TIME */}
          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>CATEGORY</label>
              <div className={styles.selectWrap}>
                <select
                  className={styles.select}
                  defaultValue={isFilled ? "Seafood" : ""}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option>Seafood</option>
                  <option>Chicken</option>
                  <option>Vegetarian</option>
                  <option>Dessert</option>
                </select>
                <span className={styles.chev} aria-hidden="true">
                  ▾
                </span>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>COOKING TIME</label>
              <div
                className={styles.timeControl}
                role="group"
                aria-label="Cooking time"
              >
                <button
                  type="button"
                  className={styles.circleBtn}
                  aria-label="Decrease time"
                >
                  –
                </button>
                <span className={styles.timeValue}>
                  {isFilled ? "40 min" : "10 min"}
                </span>
                <button
                  type="button"
                  className={styles.circleBtn}
                  aria-label="Increase time"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* AREA */}
          <div className={styles.block}>
            <label className={styles.label}>AREA</label>
            <div className={styles.selectWrap}>
              <select
                className={styles.select}
                defaultValue={isFilled ? "Europe" : ""}
              >
                <option value="" disabled>
                  Area
                </option>
                <option>Europe</option>
                <option>Asia</option>
                <option>America</option>
                <option>Africa</option>
              </select>
              <span className={styles.chev} aria-hidden="true">
                ▾
              </span>
            </div>
          </div>

          {/* INGREDIENTS */}
          <div className={styles.block}>
            <label className={styles.label}>INGREDIENTS</label>

            <div className={styles.ingRow}>
              <div className={styles.selectWrap}>
                <select
                  className={styles.select}
                  defaultValue={isFilled ? "Salmon" : ""}
                >
                  <option value="" disabled>
                    Add the ingredient
                  </option>
                  <option>Salmon</option>
                  <option>Avocado</option>
                  <option>Spinach</option>
                  <option>Tomatoes</option>
                </select>
                <span className={styles.chev} aria-hidden="true">
                  ▾
                </span>
              </div>

              <input
                className={styles.qty}
                type="text"
                placeholder="Enter quantity"
                defaultValue={isFilled ? "400 g" : ""}
              />
            </div>

            <button type="button" className={styles.addBtn}>
              ADD INGREDIENT <span className={styles.plus}>＋</span>
            </button>

            {isFilled && (
              <div className={styles.ingCards}>
                <div className={styles.ingCard}>
                  <button
                    type="button"
                    className={styles.cardX}
                    aria-label="Remove ingredient"
                  >
                    ×
                  </button>
                  <div className={styles.ingThumb}>
                    <img
                      src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&auto=format&fit=crop"
                      alt=""
                    />
                  </div>
                  <div className={styles.ingMeta}>
                    <div className={styles.ingName}>Salmon</div>
                    <div className={styles.ingSub}>400 g</div>
                  </div>
                </div>

                <div className={styles.ingCard}>
                  <button
                    type="button"
                    className={styles.cardX}
                    aria-label="Remove ingredient"
                  >
                    ×
                  </button>
                  <div className={styles.ingThumb}>
                    <img
                      src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&auto=format&fit=crop"
                      alt=""
                    />
                  </div>
                  <div className={styles.ingMeta}>
                    <div className={styles.ingName}>Avocado</div>
                    <div className={styles.ingSub}>3</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PREPARATION */}
          <div className={styles.block}>
            <label className={styles.label}>RECIPE PREPARATION</label>
            <div className={styles.textareaWrap}>
              <textarea
                className={styles.prep}
                placeholder="Enter recipe"
                maxLength={1000}
                defaultValue={
                  isFilled
                    ? "Is a healthy salad recipe that’s big on nutrients and flavor. A moist, pan seared salmon is layered on top of spinach, avocado, tomatoes, and red onions. Then drizzled with a homemade lemon vinaigrette."
                    : ""
                }
              />
              <span className={styles.counter}>
                {isFilled ? "108" : "0"}/1000
              </span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.trashBtn}
              aria-label="Delete"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 7h12l-1 14H7L6 7Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M4 7h16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            <button type="submit" className={styles.publishBtn}>
              PUBLISH
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
