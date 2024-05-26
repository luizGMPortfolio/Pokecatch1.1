//css
import './ListCards.css'
//components
import Card from './Card'


const ListCards = ({ List, OurPokemons, aba }) => {



    return (
        <>
            {List && List.map((pokemon) => (
                <>
                    {aba &&
                        <>
                            {OurPokemons.map((OurPokemon) => {
                                if (pokemon.id === OurPokemon) {
                                    <Card
                                        name={pokemon.name}
                                        img={pokemon.sprites.other["official-artwork"].front_default}
                                        types={pokemon.types}
                                        num={pokemon.id}
                                    />
                                }
                                console.log(OurPokemon)
                            })}
                        </>
                    }
                    {!aba &&
                        <Card
                            name={pokemon.name}
                            img={pokemon.sprites.other["official-artwork"].front_default}
                            types={pokemon.types}
                            num={pokemon.id}
                        />
                    }
                </>
            ))}
            {aba &&
                <>
                    {List && List.map((pokemon) => (

                        <Card
                            name={pokemon.name}
                            img={pokemon.sprites.other["official-artwork"].front_default}
                            types={pokemon.types}
                            num={pokemon.id}
                        />
                    ))}
                </>
            }
            {!aba &&
                <>
                    {List && List.map((pokemon) => (
                        <Card
                            name={pokemon.name}
                            img={pokemon.sprites.other["official-artwork"].front_default}
                            types={pokemon.types}
                            num={pokemon.id}
                        />
                    ))}
                </>

            }
        </>


    )
}

export default ListCards