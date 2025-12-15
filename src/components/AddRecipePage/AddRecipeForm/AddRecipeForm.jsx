import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router";
import styles from "./AddRecipeForm.module.css";
import { selectIsAuthenticated } from "../../../redux/auth/authSlice";
import { toast, Toaster } from "react-hot-toast";
import { fetchCategories } from "../../../redux/categories/categoriesOperations";
import {
  selectCategoriesItems,
  selectCategoriesStatus,
} from "../../../redux/categories/categoriesSlice";
import { fetchAreas } from "../../../redux/areas/areasOperations";
import {
  selectAreasItems,
  selectAreasStatus,
} from "../../../redux/areas/areasSlice";
import { fetchIngredients } from "../../../redux/ingredients/ingredientsOperations";
import {
  selectIngredientsItems,
  selectIngredientsStatus,
} from "../../../redux/ingredients/ingredientsSlice";

export default function AddRecipeForm() {
  const isAuth = useSelector(selectIsAuthenticated);
  if (!isAuth) return <Navigate to="/" replace />;

  // toggle to preview empty/filled UI
  const isFilled = false;

  const dispatch = useDispatch();

  const categories = useSelector(selectCategoriesItems);
  const categoriesStatus = useSelector(selectCategoriesStatus);
  const areas = useSelector(selectAreasItems);
  const areasStatus = useSelector(selectAreasStatus);
  const ingredients = useSelector(selectIngredientsItems);
  const ingredientsStatus = useSelector(selectIngredientsStatus);

  useEffect(() => {
    if (categoriesStatus === "idle") dispatch(fetchCategories());
    if (areasStatus === "idle") dispatch(fetchAreas());
    if (ingredientsStatus === "idle") dispatch(fetchIngredients());
  }, [dispatch, categoriesStatus, areasStatus, ingredientsStatus]);

  const categoryOptions = useMemo(() => categories ?? [], [categories]);
  const areaOptions = useMemo(() => areas ?? [], [areas]);
  const ingredientOptions = useMemo(() => ingredients ?? [], [ingredients]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientQty, setIngredientQty] = useState("");
  const [cookingTimeMin, setCookingTimeMin] = useState(10); // unfilled default

  const handleAddSelectedIngredient = (nameOrId) => {
    if (!nameOrId) return;
    const qty = ingredientQty.trim();
    if (!qty) {
      toast.error("Enter quantity");
      return; // require quantity before adding
    }
    // Find full ingredient object if available
    const found = ingredientOptions.find(
      (ing) => (ing.name ?? ing.title ?? ing.id) === nameOrId
    );
    const displayName =
      found?.name ?? found?.title ?? String(found?.id ?? nameOrId);
    const img = found?.img || null;
    // Avoid duplicates by name (check before updating to prevent double toasts in StrictMode)
    const isDuplicate = selectedIngredients.some((i) => i.name === displayName);
    if (isDuplicate) {
      toast.error("Ingredient already added", { id: "ingredient-dup" });
      return;
    }
    setSelectedIngredients((prev) => [
      ...prev,
      { name: displayName, qty, img },
    ]);
    setIngredientQty("");
  };

  return (
    <div className={styles.page}>
      <Toaster position="top-center" toastOptions={{ duration: 2500 }} />
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
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="" disabled>
                    {categoriesStatus === "loading"
                      ? "Loading categories..."
                      : "Select a category"}
                  </option>
                  {categoryOptions.map((c) => (
                    <option
                      key={c.id ?? c._id ?? c.name}
                      value={c.name ?? c.title ?? c.id}
                    >
                      {c.name ?? c.title ?? String(c.id)}
                    </option>
                  ))}
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
                  onClick={() => {
                    if (isFilled) return; // keep example intact
                    setCookingTimeMin((prev) => Math.max(5, prev - 5));
                  }}
                >
                  –
                </button>
                <span className={styles.timeValue}>
                  {isFilled ? "40 min" : `${cookingTimeMin} min`}
                </span>
                <button
                  type="button"
                  className={styles.circleBtn}
                  aria-label="Increase time"
                  onClick={() => {
                    if (isFilled) return; // keep example intact
                    setCookingTimeMin((prev) => prev + 5);
                  }}
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
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <option value="" disabled>
                  {areasStatus === "loading" ? "Loading areas..." : "Area"}
                </option>
                {areaOptions.map((a) => (
                  <option
                    key={a.id ?? a._id ?? a.name}
                    value={a.name ?? a.title ?? a.id}
                  >
                    {a.name ?? a.title ?? String(a.id)}
                  </option>
                ))}
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
                  value={selectedIngredient}
                  onChange={(e) => setSelectedIngredient(e.target.value)}
                >
                  <option value="" disabled>
                    {ingredientsStatus === "loading"
                      ? "Loading ingredients..."
                      : "Add the ingredient"}
                  </option>
                  {ingredientOptions.map((ing) => (
                    <option
                      key={ing.id ?? ing._id ?? ing.name}
                      value={ing.name ?? ing.title ?? ing.id}
                    >
                      {ing.name ?? ing.title ?? String(ing.id)}
                    </option>
                  ))}
                </select>
                <span className={styles.chev} aria-hidden="true">
                  ▾
                </span>
              </div>

              <input
                className={styles.qty}
                type="text"
                placeholder="Enter quantity"
                value={ingredientQty}
                onChange={(e) => setIngredientQty(e.target.value)}
              />
            </div>

            <button
              type="button"
              className={styles.addBtn}
              onClick={() => {
                handleAddSelectedIngredient(selectedIngredient);
                // Keep selection if validation fails; cleared inside handler on success
                if (ingredientQty.trim()) {
                  setSelectedIngredient("");
                }
              }}
            >
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

            {!isFilled && selectedIngredients.length > 0 && (
              <div className={styles.ingCards}>
                {selectedIngredients.map((item) => (
                  <div className={styles.ingCard} key={item.name}>
                    <button
                      type="button"
                      className={styles.cardX}
                      aria-label="Remove ingredient"
                      onClick={() =>
                        setSelectedIngredients((prev) =>
                          prev.filter((i) => i.name !== item.name)
                        )
                      }
                    >
                      ×
                    </button>
                    <div className={styles.ingThumb}>
                      {item.img ? (
                        <img src={item.img} alt={item.name} />
                      ) : (
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            background: "#eee",
                            borderRadius: 8,
                          }}
                        />
                      )}
                    </div>
                    <div className={styles.ingMeta}>
                      <div className={styles.ingName}>{item.name}</div>
                      <div className={styles.ingSub}>{item.qty || ""}</div>
                    </div>
                  </div>
                ))}
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
