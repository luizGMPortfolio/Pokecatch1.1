//hooks
import { useEffect, useState } from "react"
//imports
import axios from "axios";
//hooks


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

    const RandowPokemonsLocations = (types) => {



        const type = []

        for (let index = 0; index < 9; index++) {

            const number = Math.floor(Math.random() * 100);
            var t = []
            var num = 0

            if (number > 50) {
                t = types[0]
                num = Math.floor(Math.random() * t.length);
            } else if (number > 35) {
                t = types[1]
                num = Math.floor(Math.random() * t.length);
            } else if (number > 25) {
                t = types[2]
                num = Math.floor(Math.random() * t.length);
            } else if (number > 15) {
                t = types[3]
                num = Math.floor(Math.random() * t.length);
            } else if (number > 10) {
                t = types[4]
                num = Math.floor(Math.random() * t.length);
            } else {
                t = types[5]
                num = Math.floor(Math.random() * t.length);
            }


            type.map((item) => {
                if (item === t[num]) {
                    num = Math.floor(Math.random() * t.length);
                }
            })
            type.push(t[num])


        }
        console.log(type)
        return type

    }



    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { RandonPokemon, RandonHowPokemons, RandonNumber, RandowPokemonsLocations, pokemon, pokemons, loading, error };
}