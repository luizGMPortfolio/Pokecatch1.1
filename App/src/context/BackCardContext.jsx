import { useContext, createContext } from "react";

const BackCardContext = createContext()

export function BackCardProvider({children, value}){
    return <BackCardContext.Provider value={value}>{children}</BackCardContext.Provider>
}

export function useBackCardValue(){
    return useContext(BackCardContext);
}