import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { Login, RegistrationForm, TokenType } from "../models/types/userType";
import { useUser } from "../providers/UserProvider";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../service/localStorage";
import { login, signup } from "../service/userApi";

type ErrorType = null | string;

const useHandleUser = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const { setUser, setToken, user } = useUser();
  const [failedLogin, setFailedLogin] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();

  useAxios();

  const snack = useSnack();
  const navigate = useNavigate();

  const requestStatus = useCallback(
    (
      loading: boolean,
      errorMessage: string | null,
      user: null | TokenType = null
    ) => {
      setLoading(loading);
      setError(errorMessage);
      setUser(user);
    },
    [setUser]
  );

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const handleLogin = useCallback(
    async (user: Login) => {
      try {
        if (isBlocked) {
          snack(
            "error",
            "You blocked for 24 hours. Please try again tommorow!"
          );
          return;
        }

        setLoading(true);
        const token = await login(user);
        setTokenInLocalStorage(token);
        setToken(token);
        const userFromLocalStorage = getUser();
        requestStatus(false, null, userFromLocalStorage);
        navigate(ROUTES.ROOT);
        setFailedLogin(0);
      } catch (error) {
        if (typeof error === "string") {
          requestStatus(false, error, null);
          snack("error", "Incorrect email/password");

          setFailedLogin((prevAttempts) => prevAttempts + 1);

          if (failedLogin >= 2) {
            setIsBlocked(true);
            snack(
              "error",
              "You blocked for 24 hours. Please try again tommorow!"
            );

            setTimeout(() => setIsBlocked(false), 86400000);
          }
        }
      }
    },
    [setToken, navigate, requestStatus, snack, isBlocked, failedLogin]
  );

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]);

  const handleSignup = useCallback(
    async (user: RegistrationForm) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeUser(user);
        await signup(normalizedUser);
        await handleLogin({ email: user.email, password: user.password });
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    [handleLogin, requestStatus]
  );

  const value = useMemo(() => {
    return {
      isLoading,
      error,
      user,
    };
  }, [isLoading, error, user]);

  return {
    value,
    handleLogin,
    handleLogout,
    handleSignup,
  };
};

export default useHandleUser;
