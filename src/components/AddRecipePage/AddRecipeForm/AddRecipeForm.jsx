import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import styles from "./AddRecipeForm.module.css";
import { selectIsAuthenticated } from "../../../redux/auth/authSlice";
import { toast } from "react-hot-toast";
import { api } from "../../../redux/client";
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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Icon from "../../shared/Icon/Icon.jsx";
import ResponsiveImage from "../../shared/ResponsiveImage/ResponsiveImage.jsx";
import foodPlaceholder from "../../../assets/food.png";

export default function AddRecipeForm() {
  const isAuth = useSelector(selectIsAuthenticated);

  // toggle to preview empty/filled UI
  const isFilled = false;

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientQty, setIngredientQty] = useState("");
  const [thumbPreview, setThumbPreview] = useState(null);

  const handleAddSelectedIngredient = (
    nameOrId,
    setFieldValue,
    setFieldError
  ) => {
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
    const id = String(found?.id ?? found?._id ?? nameOrId);
    // Avoid duplicates by name (check before updating to prevent double toasts in StrictMode)
    const isDuplicate = selectedIngredients.some(
      (i) => i.name === displayName || i.id === id
    );
    if (isDuplicate) {
      toast.error("Ingredient already added", { id: "ingredient-dup" });
      return;
    }
    setSelectedIngredients((prev) => {
      const next = [...prev, { id, name: displayName, qty, img }];
      setFieldValue("ingredients", next);
      if (setFieldError) setFieldError("ingredients", undefined);
      return next;
    });
    setIngredientQty("");
  };

  const handleThumbChange = (e, setFieldValue) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error("Image too large (max 10MB)");
      return;
    }
    const url = URL.createObjectURL(file);
    setThumbPreview(url);
    setFieldValue("thumb", file);
  };

  const clearThumb = () => {
    if (thumbPreview) URL.revokeObjectURL(thumbPreview);
    setThumbPreview(null);
  };

  const ValidationSchema = Yup.object({
    title: Yup.string().trim().required("Title is required"),
    description: Yup.string()
      .trim()
      .max(200, "Max 200 characters")
      .required("Description is required"),
    instructions: Yup.string()
      .trim()
      .max(1000, "Max 1000 characters")
      .required("Recipe preparation is required"),
    category: Yup.string().required("Select a category"),
    area: Yup.string().required("Select an area"),
    time: Yup.number()
      .typeError("Enter time in minutes")
      .min(1, "Minimum 1 minute")
      .required("Cooking time is required"),
    thumb: Yup.mixed().required("Photo is required"),
    ingredients: Yup.array()
      .min(1, "Add at least one ingredient")
      .required("Add at least one ingredient"),
  });

  return isAuth ? (
    <div className={styles.page}>
      <Formik
        initialValues={{
          title: "",
          description: "",
          instructions: "",
          category: "",
          area: "",
          time: 10,
          thumb: null,
          ingredients: [],
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (
          values,
          { setSubmitting, resetForm, setFieldError, setTouched }
        ) => {
          try {
            if (selectedIngredients.length < 1) {
              toast.error("Add at least one ingredient", {
                id: "recipe-ingredients",
              });
              setFieldError("ingredients", "Add at least one ingredient");
              setTouched({ ...setTouched.touched, ingredients: true });
              setSubmitting(false);
              return;
            }
            const form = new FormData();
            form.append("title", values.title.trim());
            form.append("description", values.description.trim());
            form.append("instructions", values.instructions.trim());
            form.append("category", values.category);
            form.append("area", values.area);
            form.append("time", String(values.time));
            const ingredientsPayload = selectedIngredients.map((i) => ({
              id: String(i.id),
              measure: i.qty || undefined,
            }));
            form.append("ingredients", JSON.stringify(ingredientsPayload));
            if (values.thumb) form.append("thumb", values.thumb);

            const { data } = await api.post("/recipes", form);
            toast.success("Recipe created");
            clearThumb();
            setSelectedIngredients([]);
            setIngredientQty("");
            setSelectedIngredient("");
            resetForm();
            // Redirect to the new recipe page if backend returns id
            const newId = data?.data?.id ?? data?.id ?? data?._id;
            if (newId) {
              navigate(`/recipe/${newId}`);
            }
          } catch (err) {
            const message = err.response?.data?.message || err.message;
            toast.error(message || "Failed to create recipe");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          touched,
          setFieldValue,
          values,
          setFieldError,
          setFieldTouched,
        }) => (
          <Form className={styles.form}>
            {/* LEFT */}
            <div className={styles.left}>
              {!isFilled && thumbPreview ? (
                <div className={styles.previewBlock}>
                  <div className={styles.previewFrame}>
                    <ResponsiveImage
                      className={styles.previewImg}
                      src={thumbPreview}
                      fallbackSrc={foodPlaceholder}
                      alt="Recipe preview"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <label className={styles.uploadAnother}>
                    <input
                      className={styles.fileInput}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleThumbChange(e, setFieldValue)}
                    />
                    Upload another photo
                  </label>
                </div>
              ) : !isFilled ? (
                <>
                  <label
                    className={`${styles.uploader} ${styles.uploaderEmpty}`}
                  >
                    <input
                      className={styles.fileInput}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleThumbChange(e, setFieldValue)}
                    />
                    <Icon
                      id="icon-camera-capture"
                      className={styles.responsiveIconUpload}
                    />
                    <span className={styles.uploadLink}>Upload a photo</span>
                  </label>
                  {touched.thumb && errors.thumb && (
                    <div className={styles.errorMsg}>{errors.thumb}</div>
                  )}
                </>
              ) : (
                <div className={styles.previewBlock}>
                  <div className={styles.previewFrame}>
                    <ResponsiveImage
                      className={styles.previewImg}
                      src={
                        thumbPreview ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1400&auto=format&fit=crop"
                      }
                      fallbackSrc={foodPlaceholder}
                      alt="Recipe preview"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <label className={styles.uploadAnother}>
                    <input
                      className={styles.fileInput}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleThumbChange(e, setFieldValue)}
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
                <Field
                  name="title"
                  as="input"
                  type="text"
                  placeholder="THE NAME OF THE RECIPE"
                  className={`${styles.titleInput} ${
                    touched.title && errors.title ? styles.invalidLine : ""
                  }`}
                />
                {touched.title && errors.title && (
                  <div className={styles.errorMsg}>{errors.title}</div>
                )}

                <div className={styles.textareaWrap}>
                  <Field
                    name="description"
                    as="textarea"
                    className={`${styles.desc} ${
                      touched.description && errors.description
                        ? styles.invalidLine
                        : ""
                    }`}
                    placeholder="Enter a description of the dish"
                    maxLength={200}
                  />
                  <span className={styles.counter}>
                    <span
                      className={
                        values.description && values.description.length > 0
                          ? styles.textBlack
                          : styles.textGray
                      }
                    >
                      {isFilled
                        ? "45"
                        : String(values.description?.length || 0)}
                    </span>
                    <span className={styles.textGray}>/200</span>
                  </span>
                  {touched.description && errors.description && (
                    <div className={styles.errorMsg}>{errors.description}</div>
                  )}
                </div>
              </div>

              {/* CATEGORY + TIME */}
              <div className={styles.row2}>
                <div className={`${styles.field} ${styles.grow}`}>
                  <label className={styles.label}>CATEGORY</label>
                  <div className={styles.selectWrap}>
                    <Field
                      as="select"
                      name="category"
                      className={`${styles.select} ${
                        touched.category && errors.category
                          ? styles.invalid
                          : ""
                      } ${!values.category ? styles.placeholderColor : ""}`}
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
                    </Field>
                    <Icon
                      id="icon-chevron-down"
                      className={styles.chev}
                      width={18}
                      height={18}
                    />
                  </div>
                  {touched.category && errors.category && (
                    <div className={styles.errorMsg}>{errors.category}</div>
                  )}
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
                        const next = Math.max(1, Number(values.time || 1) - 1);
                        setFieldValue("time", next);
                        setFieldTouched("time", true);
                      }}
                    >
                      –
                    </button>
                    <span
                      className={`${styles.timeValue} ${
                        touched.time ? styles.textBlack : styles.textGray
                      }`}
                    >
                      {isFilled ? "40 min" : `${values.time} min`}
                    </span>
                    <button
                      type="button"
                      className={styles.circleBtn}
                      aria-label="Increase time"
                      onClick={() => {
                        if (isFilled) return; // keep example intact
                        const next = Number(values.time || 1) + 1;
                        setFieldValue("time", next);
                        setFieldTouched("time", true);
                      }}
                    >
                      +
                    </button>
                  </div>
                  {touched.time && errors.time && (
                    <div className={styles.errorMsg}>{errors.time}</div>
                  )}
                </div>
              </div>

              {/* AREA */}
              <div className={styles.field}>
                <label className={styles.label}>AREA</label>
                <div className={styles.selectWrap}>
                  <Field
                    as="select"
                    name="area"
                    className={`${styles.select} ${
                      touched.area && errors.area ? styles.invalid : ""
                    } ${!values.area ? styles.placeholderColor : ""}`}
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
                  </Field>
                  <Icon
                    id="icon-chevron-down"
                    className={styles.chev}
                    width={18}
                    height={18}
                  />
                </div>
                {touched.area && errors.area && (
                  <div className={styles.errorMsg}>{errors.area}</div>
                )}
              </div>

              {/* INGREDIENTS */}
              <div className={styles.field}>
                <label className={styles.label}>INGREDIENTS</label>

                <div className={styles.ingRow}>
                  <div className={styles.selectWrap}>
                    <select
                      className={`${styles.select} ${
                        touched.ingredients && errors.ingredients
                          ? styles.invalid
                          : ""
                      } ${!selectedIngredient ? styles.placeholderColor : ""}`}
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
                    <Icon
                      id="icon-chevron-down"
                      className={styles.chev}
                      width={18}
                      height={18}
                    />
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
                    handleAddSelectedIngredient(
                      selectedIngredient,
                      setFieldValue,
                      setFieldError
                    );
                    // Keep selection if validation fails; cleared inside handler on success
                    if (ingredientQty.trim()) {
                      setSelectedIngredient("");
                    }
                  }}
                >
                  ADD INGREDIENT
                  <Icon id="icon-plus" className={styles.responsiveIconPlus} />
                </button>
                {selectedIngredients.length > 0 && (
                  <div className={styles.ingCards}>
                    {selectedIngredients.map((item) => (
                      <div className={styles.ingCard} key={item.name}>
                        <button
                          type="button"
                          className={styles.cardX}
                          aria-label="Remove ingredient"
                          onClick={() =>
                            setSelectedIngredients((prev) => {
                              const next = prev.filter(
                                (i) => i.name !== item.name
                              );
                              setFieldValue("ingredients", next);
                              return next;
                            })
                          }
                        >
                          <Icon id="icon-close" className={styles.iconClose} />
                        </button>
                        <div className={styles.ingThumb}>
                          {item.img ? (
                            <img
                              src={item.img}
                              alt={item.name}
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div className={styles.thumbPlaceholder} />
                          )}
                          {touched.ingredients && errors.ingredients && (
                            <div className={styles.errorMsg}>
                              {errors.ingredients}
                            </div>
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
                  <Field
                    name="instructions"
                    as="textarea"
                    className={`${styles.prep} ${
                      touched.instructions && errors.instructions
                        ? styles.invalidLine
                        : ""
                    }`}
                    placeholder="Enter recipe"
                    maxLength={1000}
                  />
                  <span className={styles.counter}>
                    <span
                      className={
                        values.instructions && values.instructions.length > 0
                          ? styles.textBlack
                          : styles.textGray
                      }
                    >
                      {isFilled
                        ? "108"
                        : String(values.instructions?.length || 0)}
                    </span>
                    <span className={styles.textGray}>/1000</span>
                  </span>
                  {touched.instructions && errors.instructions && (
                    <div className={styles.errorMsg}>{errors.instructions}</div>
                  )}
                </div>
              </div>

              {/* ACTIONS */}
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.trashBtn}
                  aria-label="Delete"
                  onClick={() => {
                    clearThumb();
                    setSelectedIngredients([]);
                    setIngredientQty("");
                    setSelectedIngredient("");
                    // Reset Formik fields
                    setFieldValue("title", "");
                    setFieldValue("description", "");
                    setFieldValue("instructions", "");
                    setFieldValue("category", "");
                    setFieldValue("area", "");
                    setFieldValue("time", 10);
                    setFieldValue("thumb", null);
                  }}
                >
                  <Icon id="icon-trash" className={styles.trashIcon} />
                </button>
                <button type="submit" className={styles.publishBtn}>
                  PUBLISH
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}
