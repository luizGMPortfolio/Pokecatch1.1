//hooks
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ref, set } from 'firebase/database';
import { db, Database } from "../firebase/config";
//imports
import axios from 'axios';

export const useFetchPokemons = (type = null, Gen = null, Region = null) => {

  const [List, setList] = useState([]);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const [Filters, setFilters] = useState({})
  const filters = {
    bug: [],
    electric: [],
    fire: [],
    water: [],
    grass: [],
    poison: [],
    flying: [],
    normal: [],
    ground: [],
    fairy: [],
    fighting: [],
    psychic: [],
    ghost: [],
    ice: [],
    rock: [],
    dragon: [],
    dark: []
  }

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


  const insertFilters = async () => {

    if (Filters) {
      try {
        set(ref(Database, 'filters'), {
          bug: Filters.bug,
          electric: Filters.electric,
          fire: Filters.fire,
          water: Filters.water,
          grass: Filters.grass,
          poison: Filters.poison,
          flying: Filters.flying,
          normal: Filters.normal,
          ground: Filters.ground,
          fairy: Filters.fairy,
          fighting: Filters.fighting,
          psychic: Filters.psychic,
          ghost: Filters.ghost,
          ice: Filters.ice,
          rock: Filters.rock,
          dragon: Filters.dragon,
          dark: Filters.dark
        })
      } catch (error) {
        console.log(error);
        setError(error.message);
      }

    }

  }

  const FetchPokemon = async (num) => {

    setLoading(true);

    try {

      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + num + "/");
      return response.data

    } catch (error) {
      console.log(error);
      setError(error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { List, FetchPokemon, loading, error };
}