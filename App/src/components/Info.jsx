import './Info.css'

import { useState, useEffect } from "react"
import { useFetchPokemons } from "../hooks/useFetchPokemons"
import { constructNow } from 'date-fns'
import { el } from 'date-fns/locale'

const Info = ({ num }) => {


    const [pokemon, setPokemon] = useState(null)
    const [species, setSpecies] = useState(null)
    const [evolves, setEvolves] = useState(null)
    const [Stage, setStage] = useState('status')
    const { FetchPokemon } = useFetchPokemons()

    const [EvolveChain, setEvolveChain] = useState()

    useEffect(() => {
        async function Getdata() {

            const PokemonData = await FetchPokemon('pokemon', num)
            console.log(PokemonData)
            setPokemon(PokemonData)
            const SpeciesData = await FetchPokemon('pokemon-species', num)
            console.log(SpeciesData)
            setSpecies(SpeciesData)

        }
        if (num) {
            Getdata()
        }
    }, [num])

    useEffect(() => {
        async function Getdata() {
            const EvolvesData = await FetchPokemon(null, null, species.evolution_chain.url)
            console.log(EvolvesData)
            setEvolves(EvolvesData)
        }
        if (species) {
            Getdata()
        }
    }, [species])

    useEffect(() => {
        if (evolves) {
            GetChainEvolves()
        }
    }, [evolves])

    function GetEvolveStage() {
        if (evolves.chain.species.name === pokemon.name && evolves.chain.evolves_to) {
            return <span>Unic</span>
        }
        else if (evolves.chain.species.name === pokemon.name) {
            return <span>First</span>
        }
        else if (evolves.chain.evolves_to[0].species.name === pokemon.name) {
            if (!evolves.chain.evolves_to[0].evolves_to[0]) {
                return <span>Final</span>
            }
            else {
                return <span>Mediun</span>
            }

        }
        else if (evolves.chain.evolves_to[0].evolves_to[0].species.name === pokemon.name) {
            return <span>Final</span>
        }

    }
    function GetClass() {
        if (species.is_legendary) {
            return <span>Legendary</span>
        }
        else if (species.is_mythical) {
            return <span>Mythical</span>
        }
        else if (species.is_baby) {
            return <span>Baby</span>
        }
        else {
            return <span>Normal</span>
        }
    }
    async function GetChainEvolves(){
        const ChainEvolves = []

        ChainEvolves.push(await FetchPokemon('pokemon', evolves.chain.species.name))

        if(evolves.chain.evolves_to[0]){
            ChainEvolves.push(await FetchPokemon('pokemon', evolves.chain.evolves_to[0].species.name))
        }
        if(evolves.chain.evolves_to[0].evolves_to[0]){
            ChainEvolves.push( await FetchPokemon('pokemon', evolves.chain.evolves_to[0].evolves_to[0].species.name))
        }

        setEvolveChain(ChainEvolves)
    }

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
                                    <span>
                                        <p>{pokemon.stats[1].stat.name}:</p>
                                        <p>{pokemon.stats[1].base_stat}</p>
                                    </span>
                                    <span>
                                        <p>{pokemon.stats[2].stat.name}:</p>
                                        <p>{pokemon.stats[2].base_stat}</p>
                                    </span>
                                    <span>
                                        <p>{pokemon.stats[3].stat.name}:</p>
                                        <p>{pokemon.stats[3].base_stat}</p>
                                    </span>
                                    <span>
                                        <p>{pokemon.stats[4].stat.name}:</p>
                                        <p>{pokemon.stats[4].base_stat}</p>
                                    </span>
                                    <span>
                                        <p>{pokemon.stats[5].stat.name}:</p>
                                        <p>{pokemon.stats[5].base_stat}</p>
                                    </span>
                                </div>
                            }
                            {Stage === 'moves' &&
                                <div className='move'>
                                    {pokemon.moves.map((move) => (
                                        <span>{move.move.name}</span>

                                    ))}
                                </div>
                            }
                            {Stage === 'sobre' &&
                                <>
                                    <div className='class'>
                                        {GetEvolveStage()}
                                        {GetClass()}
                                    </div>
                                    <div className='evolves'>
                                        {EvolveChain.map((chain) => (
                                            <img src={chain.sprites.other["official-artwork"].front_default} alt="" />   
                                        ))}
                                    </div>
                                    <div>

                                    </div>
                                    <div>
                                        <span>Height:{pokemon.height}</span>
                                        <span>Weight:{pokemon.weight}</span>
                                    </div>
                                    <div>
                                        <h2>Habilidades</h2>
                                        {pokemon.abilities.map((ability) => (
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