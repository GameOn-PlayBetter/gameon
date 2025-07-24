// hooks/useAuth.ts
import { useState } from "react";

let globalAuthState = false;

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(globalAuthState);

  const login = () => {
    globalAuthState = true;
    setIsLoggedIn(true);
  };

  return { isLoggedIn, login };
}