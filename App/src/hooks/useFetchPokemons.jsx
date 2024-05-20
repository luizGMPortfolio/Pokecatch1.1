//hooks
import React, { useRef, useState, useEffect, useCallback } from 'react';
//imports
import axios from 'axios';

export const useFetchPokemons = (type = null, Gen = null, Region = null) => {

    const [List, setList] = useState([]);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        const loadDocument = async () => {
            if (cancelled) {
                return;
            }

            setLoading(true);

            try {
                var info = [];
                for (let j = 1; j <= 1025; j++) {
                    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + j + "/");
                    info.push(response.data);

                }
                setList(info);
                setLoading(false);

            } catch (error) {
                console.log(error);
                setError(error.message);
            }

            setLoading(false);
        }
        loadDocument();
    }, [type, Gen, Region]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { List, loading, error };
}