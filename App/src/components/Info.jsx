import './Info.css'

import { useState, useEffect } from "react"
import { useFetchPokemons } from "../hooks/useFetchPokemons"

const Info = ({ num }) => {


    const [pokemon, setPokemon] = useState(null)
    const { FetchPokemon } = useFetchPokemons()

    useEffect(() => {
        async function Getdata() {
            const data = await FetchPokemon(num)
            console.log(data)
            setPokemon(data)
        }
        if (num) {
            Getdata()
        }
    }, [num])

    return (
        <div className='info'>
            {pokemon &&
                <>
                    <img src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
                    <h3>{pokemon.name}</h3>

                    <div className='types'>
                        {pokemon.types && pokemon.types.map(type => (
                            <div className={`type1 ${type.type.name}`}>
                                <span>{type.type.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className='informacoes'></div>

                </>
            }
        </div>
    )
}

export default Info