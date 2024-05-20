//css
import './How.css'
//imports
import backcard from '../../assets/Backgrounds/backcard.png'

//hooks
import { useState, useEffect } from 'react'
import { useRandonPokemon } from '../../hooks/useRandonPokemon'
import { useRandonPokeball } from '../../hooks/useRandowPokeballs';

//components
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'

const How = ({ setRewards }) => {

  const { RandonHowPokemons, pokemons, loading, error } = useRandonPokemon();
  const { RandonPokeball, pokebolas: Rpokebolas, loading: Rloading, error: Rerror } = useRandonPokeball();

  const [num, setNum] = useState()
  const [pokemon, setPokemon] = useState()

  useEffect(() => {
    RandonHowPokemons()
    RandonPokeball()
  }, [])

  useEffect(() => {
    if (pokemons) {
      setNum(pokemons[4])
      setPokemon(pokemons[pokemons[4]])
    }
  }, [pokemons])

  const CheckChoise = (choise) => {

    if (pokemon.data.name === choise) {
      const NewRewards = {
        pokemon: pokemon.data,
        pokebolas: Rpokebolas
      }
      console.log(NewRewards)
      setRewards(NewRewards)
    }
  }


  return (
    <>
      <Navbar />
      <div className='How'>
        <div className='title'>
          <h3>Quem é esse</h3>
          <h1>Pokemon?</h1>
        </div>
        {!pokemons &&
          <div className='cardHow'>
            <Card Style={'Back'} />
          </div>
        }
        {pokemon &&
          <>

            <div className='cardHow'>
              <Card
                name={pokemon.data.name}
                img={pokemon.data.sprites.other["official-artwork"].front_default}
                types={pokemon.data.types}
                num={pokemon.data.id}
                Style={'Ocult'}
              />
            </div>
            <div className='choises'>
              <ul>
                <li onClick={() => CheckChoise(pokemons[0].data.name)}>{pokemons[0].data.name}</li>
                <li onClick={() => CheckChoise(pokemons[1].data.name)}>{pokemons[1].data.name}</li>
                <li onClick={() => CheckChoise(pokemons[2].data.name)}>{pokemons[2].data.name}</li>
                <li onClick={() => CheckChoise(pokemons[3].data.name)}>{pokemons[3].data.name}</li>
              </ul>
            </div>
          </>
        }

      </div>
    </>
  )
}

export default How