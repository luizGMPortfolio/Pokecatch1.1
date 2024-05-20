import { useContext, createContext } from "react";

const ListContext = createContext()

export function ListProvider({children, value}){
    return <ListContext.Provider value={value}>{children}</ListContext.Provider>
}

export function useListValue(){
    return useContext(ListContext);
}