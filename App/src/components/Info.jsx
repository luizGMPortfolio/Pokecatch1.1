import './Info.css'

import { useState, useEffect } from "react"
import { useFetchPokemons } from "../hooks/useFetchPokemons"
import { IoClose } from "react-icons/io5";

const Info = ({ num, setInfo }) => {


    const [pokemon, setPokemon] = useState(null)
    const [species, setSpecies] = useState(null)
    const [evolves, setEvolves] = useState(null)
    const [varieties, setVarieties] = useState(null)
    const [damages, setDamages] = useState(null)
    const [Stage, setStage] = useState('sobre')
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
            GetVarieties()
        }
    }, [species])

    useEffect(() => {
        if (evolves) {
            GetChainEvolves()
            Getdamages()
        }
    }, [evolves])

    function GetEvolveStage() {
        if (!evolves.chain.evolves_to[0]) {
            return <span className='unic'>Unic</span>
        }
        else if (evolves.chain.species.name === pokemon.name) {
            return <span className='Inicial'>Inicial</span>
        }
        else if (evolves.chain.evolves_to[0].species.name === pokemon.name) {
            if (!evolves.chain.evolves_to[0].evolves_to[0]) {
                return <span className='final'>Final</span>
            }
            else {
                return <span className='medium'>Mediun</span>
            }

        }
        else if (evolves.chain.evolves_to[0].evolves_to[0].species.name === pokemon.name) {
            return <span className='final'>Final</span>
        }

    }
    function GetClass() {
        if (species.is_legendary) {
            return <span className='legendary'>Legendary</span>
        }
        else if (species.is_mythical) {
            return <span className='mythical'>Mythical</span>
        }
        else if (species.is_baby) {
            return <span className='baby'>Baby</span>
        }
        else {
            return <span className='normal'>Normal</span>
        }
    }
    async function GetChainEvolves() {
        const ChainEvolves = []

        ChainEvolves.push(await FetchPokemon('pokemon', evolves.chain.species.name))

        if (evolves.chain.evolves_to[0]) {
            ChainEvolves.push(await FetchPokemon('pokemon', evolves.chain.evolves_to[0].species.name))
        }
        if (evolves.chain.evolves_to[0].evolves_to[0]) {
            ChainEvolves.push(await FetchPokemon('pokemon', evolves.chain.evolves_to[0].evolves_to[0].species.name))
        }

        setEvolveChain(ChainEvolves)
    }
    async function GetVarieties() {
        const varietiesData = []
        species.varieties.map(async (varietie) => {
            if (!varietie.is_default) {
                varietiesData.push(await FetchPokemon(null, null, varietie.pokemon.url))
            }
        })
        setVarieties(varietiesData)
    }
    async function Getdamages() {
        const dataType = []
        pokemon.types.map(async (type) => {
            dataType.push(await FetchPokemon(null, null, type.type.url))
        })
        console.log(dataType)
        setDamages(dataType)
    }

    function GetVeryEfective() {
        const types = []
        damages.map((damage) => {
            damage.damage_relations.double_damage_to.map((type) => {
                if (type)
                    types.push(type.name)
            })
        })
        const VeryEfective = types.filter((item, index) => types.indexOf(item) === index)
        return (
            <>
                <div className='types'>
                    {VeryEfective.map((type) => (
                        <span className={`type1 ${type}`}>{type}</span>
                    ))}
                </div>
            </>
        )
    }
    function GetResistence() {
        const types = []
        damages.map((damage) => {
            damage.damage_relations.half_damage_from.map((type) => {
                if (type)
                    types.push(type.name)
            })
        })
        const DoubleResistence = types.filter((item, index) => types.indexOf(item) !== types.lastIndexOf(item) && types.indexOf(item) === index);
        const resistence = getUniqueItems(types)
        return (
            <>
                <div>
                    {DoubleResistence.length > 0 &&
                        <>
                            <h5>4x</h5>
                            <div className='types'>

                                {DoubleResistence.map((type) => (
                                    <span className={`type1 ${type}`}>{type}</span>
                                ))}
                            </div>
                        </>

                    }
                </div>
                <div>
                    <>
                        <h5>2x</h5>
                        <div className='types'>
                            {resistence.map((type) => (
                                <span className={`type1 ${type}`}>{type}</span>
                            ))}
                        </div>
                    </>


                </div>
            </>
        )
    }
    function GetLowEffective() {
        const types = []
        damages.map((damage) => {
            damage.damage_relations.half_damage_to.map((type) => {
                if (type)
                    types.push(type.name)
            })
        })
        const VeryEfective = types.filter((item, index) => types.indexOf(item) === index)
        return (
            <>
                <h5>2x</h5>
                <div className='types'>
                    {VeryEfective.map((type) => (
                        <span className={`type1 ${type}`}>{type}</span>
                    ))}
                </div>
            </>
        )
    }
    function GetLowResistence() {
        const types = []
        damages.map((damage) => {
            damage.damage_relations.double_damage_from.map((type) => {
                if (type)
                    types.push(type.name)
            })
        })
        const DoubleResistence = types.filter((item, index) => types.indexOf(item) !== types.lastIndexOf(item) && types.indexOf(item) === index);
        const resistence = getUniqueItems(types)
        return (
            <>
                <div>
                    {DoubleResistence.length > 0 &&
                        <>
                            <h5>4x</h5>
                            <div className='types'>
                                {DoubleResistence.map((type) => (
                                    <span className={`type1 ${type}`}>{type}</span>
                                ))}
                            </div>

                        </>
                    }

                </div>
                <div>
                    <>
                        <h5>x2</h5>
                        <div className='types'>
                            {resistence.map((type) => (
                                <span className={`type1 ${type}`}>{type}</span>
                            ))}
                        </div>
                    </>
                </div>
            </>
        )
    }
    const getUniqueItems = (arr) => {
        const counts = arr.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});

        return arr.filter(item => counts[item] === 1);
    };

    const handleButton = () => {
        setInfo(false)
    }
    return (
        <div className='info'>
            {pokemon &&
                <>
                    <div className='header'>
                        <span>N°{pokemon.id}</span>
                        <button onClick={handleButton}><IoClose /></button>
                    </div>
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
                                <>
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
                                    <div className='hates'>
                                        <div><span>base_happiness: </span> {species && species.base_happiness}</div>
                                        <div><span>capture_rate: </span> {species && species.capture_rate}</div>
                                    </div>
                                    <div className='ight'>

                                        <div><span>Height:</span> {pokemon.height}</div>
                                        <div><span>Weight:</span> {pokemon.weight}</div>
                                    </div>
                                </>

                            }
                            {Stage === 'moves' &&
                                <>
                                    <div className='habilits'>
                                        <h2>Habilidades</h2>
                                        <div>
                                            {pokemon.abilities.map((ability) => (
                                                <span>{ability.ability.name}</span>
                                            ))}
                                        </div>

                                    </div>
                                    <div className='move'>
                                        <h2>Moves</h2>
                                        {pokemon.moves.map((move) => (
                                            <div>
                                                <span>{move.move.name}</span>
                                                <span>{move.version_group_details[0].move_learn_method.name}</span>
                                                <span>{move.version_group_details[0].level_learned_at}</span>
                                            </div>


                                        ))}
                                    </div>
                                </>
                            }
                            {Stage === 'sobre' &&
                                <>
                                    {damages &&
                                        <>
                                            <div className='class'>
                                                {evolves && GetEvolveStage()}
                                                {species && GetClass()}
                                            </div>

                                            <div className='evolves'>
                                                {EvolveChain &&
                                                    <div>
                                                        <h2>Evolves</h2>
                                                        {
                                                            EvolveChain.map((chain) => (
                                                                <img src={chain.sprites.other["official-artwork"].front_default} alt="" />
                                                            ))
                                                        }
                                                    </div>

                                                }

                                            </div>
                                            <div className='varieties'>
                                                {varieties.length > 0 &&
                                                    <div>
                                                        <h2>Varieties</h2>
                                                        {varieties.map((varietie) => (
                                                            <img src={varietie.sprites.other["official-artwork"].front_default} alt="" />
                                                        ))}
                                                    </div>
                                                }


                                            </div>
                                            <div className='shiny'>
                                                <h2>Shiny</h2>
                                                <img src={pokemon.sprites.other["official-artwork"].front_shiny} alt="" srcset="" />
                                            </div>
                                            <div className='vantagens'>
                                                <h2>Vantages</h2>
                                                <div>
                                                    <h4>Effective</h4>
                                                    {
                                                        GetVeryEfective()
                                                    }
                                                </div>
                                                <div>
                                                    <h4>Resistence</h4>
                                                    {
                                                        GetResistence()
                                                    }
                                                </div>
                                            </div>
                                            <div className='desvantagens'>
                                                <h2>Desvantagem</h2>
                                                <div>
                                                    <h4>LowEffective</h4>
                                                    {
                                                        GetLowEffective()
                                                    }
                                                </div>
                                                <div>
                                                    <h4>LowResistence</h4>
                                                    {
                                                        GetLowResistence()
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    }
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