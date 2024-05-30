import { Database } from "../firebase/config";
import { ref, get, child } from "firebase/database";
import { useState, useEffect } from "react";

export const useFetchDatabase = (docCollection) => {

  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);


  useEffect(() => {



  }, [docCollection, cancelled]);


  return {
    documents,
    error,
    loading
  }
}