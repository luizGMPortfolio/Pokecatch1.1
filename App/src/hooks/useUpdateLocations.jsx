
import { useLocationsChange } from "./useLocationsChange"
import { useFetchDocuments } from "./useFetchDocuments"


export const useUpdateLocations = () => {
    
    const { documents: Configs, loading } = useFetchDocuments("Configs", user.uid);

}