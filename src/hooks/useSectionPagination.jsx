import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  selectSectionPagination,
  setPagination,
} from "../redux/pagination/paginationSlice";

function buildSectionKey(pathname, params) {
  // Own profile
  if (!params?.id) {
    if (pathname.endsWith("/my-recipes") || pathname === "/user")
      return "my-recipes";
    if (pathname.endsWith("/my-favorites")) return "my-favorites";
    if (pathname.endsWith("/followers")) return "my-followers";
    if (pathname.endsWith("/following")) return "my-following";
    return "my-recipes";
  }
  // Other user's profile
  const uid = String(params.id);
  if (pathname.endsWith("/recipes")) return `user:${uid}:recipes`;
  if (pathname.endsWith("/followers")) return `user:${uid}:followers`;
  return `user:${uid}:recipes`;
}

export default function useSectionPagination() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const section = useMemo(
    () => buildSectionKey(location.pathname, params),
    [location.pathname, params]
  );

  const {
    page: storedPage,
    totalPages,
    limit,
  } = useSelector(selectSectionPagination(section));

  const pageFromUrl = Number(searchParams.get("page") || "");
  const effectivePage =
    Number.isFinite(pageFromUrl) && pageFromUrl > 0
      ? pageFromUrl
      : storedPage || 1;

  // Keep Redux in sync with URL param on section change
  useEffect(() => {
    dispatch(
      setPagination({ section, page: effectivePage, totalPages, limit })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  const setPage = useCallback(
    (nextPage) => {
      const p = Math.max(1, Number(nextPage) || 1);
      const next = new URLSearchParams(searchParams);
      next.set("page", String(p));
      setSearchParams(next, { replace: false });
      dispatch(setPagination({ section, page: p }));
    },
    [dispatch, searchParams, section, setSearchParams]
  );

  const setSectionTotalPages = useCallback(
    (tp) => {
      if (!tp) return;
      dispatch(
        setPagination({ section, totalPages: Math.max(1, Number(tp) || 1) })
      );
    },
    [dispatch, section]
  );

  const goToPage = useCallback((p) => setPage(p), [setPage]);

  return {
    section,
    page: effectivePage,
    totalPages: Number(totalPages || 1),
    limit,
    setPage,
    onPageChange: goToPage,
    setSectionTotalPages,
    navigate,
  };
}
