import { useEffect, useState } from "react";

export function useAuthListener() {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        const handler = () => {
            const saved = localStorage.getItem("user");
            setUser(saved ? JSON.parse(saved) : null);
        };

        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    return user;
}
