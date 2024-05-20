//hooks
import { useEffect, useState } from "react"
//imports
import axios from "axios";

export const useRandonPokemon = () => {

    const [pokemon, setPokemon] = useState();
    const [pokemons, setPokemons] = useState();
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false);

    const RandonNumber = (number) => {
        return Math.floor(Math.random() * number);
    }

    const RandonPokemon = async () => {

        if (cancelled) {
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + RandonNumber(1025) + "/");
            setPokemon(response.data)

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
        setLoading(false);
    }

    const RandonHowPokemons = async () => {

        if (cancelled) {
            return;
        }
        setLoading(true);

        try {

            const response = [
                await axios.get("https://pokeapi.co/api/v2/pokemon/" + RandonNumber(1025) + "/"),
                await axios.get("https://pokeapi.co/api/v2/pokemon/" + RandonNumber(1025) + "/"),
                await axios.get("https://pokeapi.co/api/v2/pokemon/" + RandonNumber(1025) + "/"),
                await axios.get("https://pokeapi.co/api/v2/pokemon/" + RandonNumber(1025) + "/"),
                RandonNumber(4)
            ]
            setPokemons(response)

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { RandonPokemon, RandonHowPokemons, RandonNumber, pokemon, pokemons, loading, error };
}