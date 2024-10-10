import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { useStorageState } from "./useStorageState";

type SessionContextType = {
  signUp: (password: string) => void;
  logIn: () => void;
  signOut: () => void;
  session: boolean;
};

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [[isLoading, storedPassword], setStoredPassword] = useStorageState<string>(process.env.USER_PASSWORD || 'next-lock-password');
  const [session, setSession] = useState<boolean>(false);

  const signUp = (password: string) => {
    setStoredPassword(password);
    setSession(true);
  }

  const logIn = () => {
    setSession(true);
  }

  const signOut = () => {
    setSession(false);
  }

  return (
    <SessionContext.Provider value={{ signUp, logIn, signOut, session, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);

  return context;
};
