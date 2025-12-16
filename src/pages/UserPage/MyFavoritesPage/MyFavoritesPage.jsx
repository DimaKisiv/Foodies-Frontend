import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { Toaster, toast } from "react-hot-toast";

import styles from "./MyFavoritesPage.module.css";

import Loader from "../../../components/Shared/Loader/Loader";
import MainTitle from "../../../components/Shared/MainTitle/MainTitle";
import Subtitle from "../../../components/Shared/Subtitle/Subtitle";
import Icon from "../../../components/Shared/Icon/Icon";

import {
  fetchFavoritesRecipes,
  deleteRecipeFromFavorites,
} from "../../../redux/recipes/recipesOperations";

import {
  selectFavoritesRecipes,
  selectRecipesStatus,
  selectRecipesError,
} from "../../../redux/recipes/recipesSlice";

import {
  selectIsAuthenticated,
  selectAuthUser,
} from "../../../redux/auth/authSlice";

const PAGE_SIZE = 8;

const MyFavoritesPage = () => {
  const dispatch = useDispatch();
  const { id: routeUserId } = useParams();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authUser = useSelector(selectAuthUser);

  const favoritesState = useSelector(selectFavoritesRecipes);

  const status = useSelector(selectRecipesStatus);
  const error = useSelector(selectRecipesError);

  const isOwnProfile =
    Boolean(isAuthenticated) &&
    Boolean(authUser?.id) &&
    String(routeUserId) === String(authUser.id);

  const favorites = useMemo(() => {
    if (Array.isArray(favoritesState)) return favoritesState;
    return favoritesState?.items || [];
  }, [favoritesState]);

  const total = useMemo(() => {
    if (Array.isArray(favoritesState)) return favorites.length;
    if (typeof favoritesState?.total === "number") return favoritesState.total;
    return favorites.length;
  }, [favoritesState, favorites]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isOwnProfile) return;
    dispatch(fetchFavoritesRecipes());
  }, [dispatch, isOwnProfile]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return favorites.slice(start, start + PAGE_SIZE);
  }, [favorites, page]);

  const handleRemove = async (recipeId) => {
    const result = await dispatch(deleteRecipeFromFavorites(recipeId));

    if (deleteRecipeFromFavorites.fulfilled.match(result)) {
      toast.success("Removed from favorites");
      dispatch(fetchFavoritesRecipes());
      return;
    }

    toast.error(result.payload || "Failed to remove from favorites");
  };

  return (
    <section className={styles.section}>
      <Toaster position="top-center" toastOptions={{ duration: 2500 }} />

      <div className={styles.head}>
        <MainTitle>My Favorites</MainTitle>
        <Subtitle maxWidth={640}>
          Your saved recipes. You can open a recipe or remove it from favorites.
        </Subtitle>
      </div>

      {!isAuthenticated && (
        <p className={styles.message}>You need to sign in to see favorites.</p>
      )}

      {isAuthenticated && !isOwnProfile && (
        <div className={styles.messageBox}>
          <p className={styles.message}>
            Favorites are available only in your own profile.
          </p>
          {authUser?.id && (
            <Link
              className={styles.goLink}
              to={`/user/${authUser.id}/my-favorites`}
            >
              Go to my favorites
            </Link>
          )}
        </div>
      )}

      {isOwnProfile && status === "loading" && (
        <div className={styles.loaderWrap}>
          <Loader />
        </div>
      )}

      {isOwnProfile && status === "failed" && (
        <p className={styles.error}>
          {error || "Failed to load favorites. Please try again."}
        </p>
      )}

      {isOwnProfile && status !== "loading" && favorites.length === 0 && (
        <p className={styles.message}>No favorites yet.</p>
      )}

      {isOwnProfile && favorites.length > 0 && (
        <>
          <ul className={styles.grid}>
            {pageItems.map((r) => {
              const recipeId = r.id || r._id;
              const title = r.title || r.name || "Untitled recipe";
              const desc = r.description || "";
              const thumb = r.thumb || "";

              return (
                <li key={recipeId} className={styles.card}>
                  <Link to={`/recipe/${recipeId}`} className={styles.thumbLink}>
                    {thumb ? (
                      <img
                        className={styles.thumb}
                        src={thumb}
                        alt={title}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.thumbPlaceholder}>No photo</div>
                    )}
                  </Link>

                  <div className={styles.body}>
                    <div className={styles.top}>
                      <Link
                        to={`/recipe/${recipeId}`}
                        className={styles.titleLink}
                      >
                        <h3 className={styles.title}>{title}</h3>
                      </Link>

                      <div className={styles.meta}>
                        {r.category && (
                          <span className={styles.badge}>{r.category}</span>
                        )}
                        {r.time ? (
                          <span className={styles.badge}>{r.time} min</span>
                        ) : null}
                      </div>
                    </div>

                    {desc && <p className={styles.desc}>{desc}</p>}

                    <div className={styles.actions}>
                      <Link
                        to={`/recipe/${recipeId}`}
                        className={styles.iconAction}
                        aria-label="Open recipe"
                      >
                        <Icon id="icon-arrow-up-right" width={18} height={18} />
                      </Link>

                      <button
                        type="button"
                        className={styles.iconAction}
                        aria-label="Remove from favorites"
                        onClick={() => handleRemove(recipeId)}
                        disabled={status === "loading"}
                      >
                        <Icon id="icon-trash" width={18} height={18} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>

              <span className={styles.pageInfo}>
                {page} / {totalPages}
              </span>

              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MyFavoritesPage;
