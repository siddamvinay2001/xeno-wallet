import { createContext, useContext, type PropsWithChildren } from "react";

type SessionContextType = {
  session: string | null;
};

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const session = "string"; // Replace with actual session logic
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  
  return context;
};
