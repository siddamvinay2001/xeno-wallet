import { createContext, useContext, useState } from "react";

const SessionContext = createContext(null)

export interface SessionProviderProps {
    children: React.ReactNode
}

export const SessionProvider = ({children}: SessionProviderProps) =>{
    const [login, setLogin] = useState(false)
    return(
        <SessionContext.Provider
            value={
                {
                    login,
                    setLogin
                }                
            }
        >
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = ()=>{
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error("useSession must be used within a <SessionProvider/>");
      }
      return context;
}