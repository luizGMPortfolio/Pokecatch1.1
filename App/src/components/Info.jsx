import './Info.css'

import { useState, useEffect } from "react"
import { useFetchPokemons } from "../hooks/useFetchPokemons"

const Info = ({ num }) => {


    const [pokemon, setPokemon] = useState(null)
    const [Stage, setStage] = useState('status')
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

                    <div className='constainer'>
                        <div className='abas'>
                            <div className={`sobre ${Stage === 'sobre' ? 'activeAba' : ''}`} onClick={() => setStage('sobre')}>
                                <h2>Sobre</h2>
                            </div>
                            <div className={`moves ${Stage === 'moves' ? 'activeAba' : ''}`} onClick={() => setStage('moves')}>
                                <h2>Moves</h2>
                            </div>
                            <div className={`status ${Stage === 'status' ? 'activeAba' : ''}`} onClick={() => setStage('status')}>
                                <h2>Status</h2>
                            </div>
                        </div>
                        <div className='informacoes'>
                            {Stage === 'status' &&
                                <div className='stats'>
                                    <h1>Status base</h1>
                                    <span>
                                        <p>{pokemon.stats[0].stat.name}:</p>
                                        <p>{pokemon.stats[0].base_stat}</p>
                                    </span>
                                    <hr />
                                    <span>
                                        <p>{pokemon.stats[1].stat.name}:</p>
                                        <p>{pokemon.stats[1].base_stat}</p>
                                    </span>
                                    <hr />
                                    <span>
                                        <p>{pokemon.stats[2].stat.name}:</p>
                                        <p>{pokemon.stats[2].base_stat}</p>
                                    </span>
                                    <hr />
                                    <span>
                                        <p>{pokemon.stats[3].stat.name}:</p>
                                        <p>{pokemon.stats[3].base_stat}</p>
                                    </span>
                                    <hr />
                                    <span>
                                        <p>{pokemon.stats[4].stat.name}:</p>
                                        <p>{pokemon.stats[4].base_stat}</p>
                                    </span>
                                    <hr />
                                    <span>
                                        <p>{pokemon.stats[5].stat.name}:</p>
                                        <p>{pokemon.stats[5].base_stat}</p>
                                    </span>
                                    <hr />
                                </div>
                            }
                            {Stage === 'moves' &&
                                <div></div>
                            }
                            {Stage === 'sobre' &&
                                <>
                                    <div>
                                        <span>Height:{pokemon.height}</span>
                                        <span>Weight:{pokemon.weight}</span>
                                    </div>
                                    <div>{pokemon.abilities.map((ability) => (
                                        <p>{ability.ability.name}</p>
                                    ))}</div>
                                </>

                            }

                        </div>
                    </div>

                </>
            }
        </div>
    )
}

export default Info