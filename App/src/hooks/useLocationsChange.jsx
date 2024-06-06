
import { useState, useEffect } from "react";

import { Database } from "../firebase/config";
import { ref, get, child, getDatabase } from "firebase/database";

import { useRandonPokemon } from "./useRandonPokemon";

export const useLocationsChange = () => {

    const [location, setLocation] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [BackCards, setBackCards] = useState(null)
    const [cancelled, setCancelled] = useState(false);

    const { RandowPokemonsLocations } = useRandonPokemon()



    const LoadDatabase = async (path) => {

        if (cancelled) {
            return;
        }

        setLoading(true);

        const dbRef = ref(Database);
        try {
            const snapshot = await get(child(dbRef, path));
            if (snapshot.exists()) {
                console.log(snapshot.val())
                return snapshot.val()
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        }

        setLoading(false);

    };

    const ChangeLocationsPokemons = async (filters) => {

        if (cancelled) {
            return;
        }

        const forest = [filters.grass, filters.bug, filters.poison, filters.normal, filters.water, filters.flying]
        const cave = [filters.rock, filters.ground, filters.fighting, filters.dark, filters.ghost, filters.grass]
        const mountain = [filters.flying, filters.rock, filters.ice, filters.electric, filters.dragon, filters.fire]
        const beach = [filters.water, filters.grass, filters.flying, filters.fairy, filters.ice, filters.psychic]
        const desert = [filters.ground, filters.rock, filters.electric, filters.psychic, filters.fire, filters.fighting]
        const vulcano = [filters.fire, filters.rock, filters.dragon, filters.normal, filters.fighting, filters.poison]
        const HantedHouse = [filters.ghost, filters.dark, filters.psychic, filters.normal, filters.fairy, filters.ice]

        const data = {
            forest: RandowPokemonsLocations(forest),
            cave: RandowPokemonsLocations(cave),
            mountain: RandowPokemonsLocations(mountain),
            beach: RandowPokemonsLocations(beach),
            desert: RandowPokemonsLocations(desert),
            vulcano: RandowPokemonsLocations(vulcano),
            HantedHouse: RandowPokemonsLocations(HantedHouse)
        }

        setLocation(data)
        console.log(data)

    };

    async function sla() {

        if (cancelled) {
            return;
        }

        setLoading(true);


        try {
            const data = await LoadDatabase('filters')
            ChangeLocationsPokemons(data)

        } catch (error) {
            console.log(error);
            setError(error.message);
        }

        setLoading(false)
    }
    async function getBackCards(){
        if (cancelled) {
            return;
        }

        setLoading(true);


        try {
            const data = await LoadDatabase('BackCards')
            setBackCards(data)

        } catch (error) {
            console.log(error);
            setError(error.message);
        }

        setLoading(false)
    }

    useEffect(() => {
        if (!location) {
            sla();
        }
        if(!BackCards){
           getBackCards();
        }
    }, [])
    


    useEffect
        (() => {
            return () => setCancelled(true);
        }, []);

    return {
        location,
        BackCards,
        loading,
        error
    }

}