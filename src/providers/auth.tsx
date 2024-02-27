import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useInterval } from "usehooks-ts";

import backend from "@src/api/backend";
import { USER_KEY } from "@src/api/auth";
import { AuthModel } from "pocketbase";
import { jwtDecode, JwtPayload } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
const TOKEN_REFRESH_BUFFER_SECONDS = 600; // 10 minutes
const REFRESH_INTERVAL_MS = 600000; // 10 minutes

// Types
export type AuthProviderType = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: AuthModel | null;
  token: string;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  logout: () => void;
};

// Context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: "",
  isAuthenticating: true,
  isAuthenticated: false,
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState(backend.authStore.model);
  const [token, setToken] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /* 
    Methods
  */
  // check if token in authstore is still valid
  // logout user and clear authstore
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    backend.authStore.clear();

    // remove user and token from asyncstorage
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("user");
  }, []);

  const authenticateToken = async () => {
    // retrieve token from asyncstorage
    const storedToken = await AsyncStorage.getItem("token");
    const storedUser = await AsyncStorage.getItem("user");

    if (storedToken && storedUser) {
      backend.authStore.save(storedToken, JSON.parse(storedUser));

      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      // clear auth store
      logout();
      setIsAuthenticated(false);
    }

    setIsAuthenticating(false);
  };

  const refreshAuthSession = useCallback(async () => {
    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const tokenExpiration = decoded.exp ?? 0; // in seconds
      const expirationWithBufferInMs =
        tokenExpiration - TOKEN_REFRESH_BUFFER_SECONDS;
      const currentTimestampInSeconds = Date.now() / 1000;

      if (currentTimestampInSeconds >= expirationWithBufferInMs) {
        setIsAuthenticated(true);
        return await backend.collection(USER_KEY).authRefresh();
      }
    } catch (error) {
      setIsAuthenticated(false);
      return logout();
    }
  }, [token, logout]);

  /* 
    On app load
  */
  useEffect(() => {
    // check if token is valid on load
    authenticateToken();

    // listener for authstore changes
    return backend.authStore.onChange(async (token, model) => {
      try {
        // save token and user to asyncstorage
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(model));

        setToken(token);
        setUser(model);
        setIsAuthenticated(token && model ? true : false);
      } catch (error) {
        console.log("Error in authstore change listener", error);
      }
    });
  }, []);

  useInterval(refreshAuthSession, token ? REFRESH_INTERVAL_MS : null);

  return (
    <AuthContext.Provider
      value={{ user, token, logout, isAuthenticating, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuth = () => useContext(AuthContext);
