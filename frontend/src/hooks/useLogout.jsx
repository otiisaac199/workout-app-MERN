import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logOut = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logOut };
};
