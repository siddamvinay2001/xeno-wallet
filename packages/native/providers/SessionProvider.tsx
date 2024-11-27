import React, { createContext, useContext, useState, ReactNode } from "react";

interface SessionContextType {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);


export const SessionProvider = ({ children }: {children: ReactNode}) => {
  const [login, setLogin] = useState<boolean>(false);

  return (
    <SessionContext.Provider value={{ login, setLogin }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a <SessionProvider/>");
  }
  return context;
};
