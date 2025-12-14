export const AUTH_STORAGE_KEY = "user";

export const getStoredAuth = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    return {
      token: parsed.token ?? null,
      user: parsed.user ?? null,
      raw: parsed,
    };
  } catch {
    return null;
  }
};

export const saveAuthToStorage = (data) => {
  if (!data) return;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
};

export const clearAuthFromStorage = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
