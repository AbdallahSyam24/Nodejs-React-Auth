import { useEffect } from "react";
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import { loginAPI } from "./network";

export const useAuth = () => {
    const { user, addUser, removeUser } = useUser();
    const { getItem } = useLocalStorage();

    useEffect(() => {
        const user = getItem("user");
        if (user) {
            addUser(JSON.parse(user));
        }
    }, []);

    const login = async (user) => {
        const res = await loginAPI(user);
        if (res.success) {
            addUser({ token: res.data, email: user.email });
        }

        return res;
    };

    const logout = () => {
        removeUser();
    };

    return { user, login, logout };
};
