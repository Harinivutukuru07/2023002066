import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ACCESS_TOKEN_STORAGE_KEY } from "../config/env";

interface TokenContextValue {
  token: string;
  setToken: (value: string) => void;
  clearToken: () => void;
}

const TokenContext = createContext<TokenContextValue | undefined>(undefined);

export function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string>(() => localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ?? "");

  useEffect(() => {
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    }
  }, [token]);

  const value: TokenContextValue = {
    token,
    setToken: (value) => setTokenState(value.trim()),
    clearToken: () => setTokenState(""),
  };

  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
}

export function useToken(): TokenContextValue {
  const context = useContext(TokenContext);

  if (!context) {
    throw new Error("useToken must be used inside TokenProvider");
  }

  return context;
}