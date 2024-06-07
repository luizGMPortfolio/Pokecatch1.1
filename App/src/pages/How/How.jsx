//css
import './How.css'


//hooks
import { useState, useEffect } from 'react'
import { useRandonPokemon } from '../../hooks/useRandonPokemon';
import { useRandonPokeball } from '../../hooks/useRandowPokeballs';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { Time } from '../../hooks/useTime'
//components
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'

const How = ({ setRewards }) => {

  const { RandonHowPokemons, pokemons, loading, error } = useRandonPokemon();
  const { RandonPokeball, pokebolas: Rpokebolas, loading: Rloading, error: Rerror } = useRandonPokeball();
  const { documents: Configs } = useFetchDocuments("Configs");
  const { updateDocument: updateConfigs, response: ConfigsResponse } = useUpdateDocument("Configs");
  const { horarioAtual } = Time();

  const [num, setNum] = useState()
  const [pokemon, setPokemon] = useState()
  const [Choise, setChoise] = useState('')
  const [trys, setTrys] = useState(null)
  const [ChoiseError, setChoiseError] = useState(0)

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

  useEffect(() => {
    if (Configs) {
      setTrys(Configs[0].pokemons)
    }
  }, [Configs])

  const CheckChoise = (choise) => {

    if (pokemon.data.name === choise) {

      const NewRewards = {
        pokemon: pokemon.data,
        pokebolas: Rpokebolas
      }
      const data = {
        pokemons: trys - 1
      }
      console.log(NewRewards)
      setRewards(NewRewards)
      updateConfigs(Configs[0].id, data)
    }
    else {
      var id = document.getElementsByClassName(choise)[0];
      id.classList.add('errado')
      if (ChoiseError > 0) {
        const data = {
          pokemons: trys - 1
        }
        updateConfigs(Configs[0].id, data)
        RandonHowPokemons()
      } else {
        setChoiseError(ChoiseError + 1)
        console.log(ChoiseError)
      }

      console.log(id)



    }
  }

  if (trys === 0) {

  }


  return (
    <>
      <Navbar />
      <div className='How'>
        <div className='title'>
          <h3>Quem é esse</h3>
          <h1>Pokemon?</h1>
        </div>
        {trys != 0 &&
          <>
            {!pokemon &&
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
                    <li className={pokemons[0].data.name} onClick={() => CheckChoise(pokemons[0].data.name)}>{pokemons[0].data.name}</li>
                    <li className={pokemons[1].data.name} onClick={() => CheckChoise(pokemons[1].data.name)}>{pokemons[1].data.name}</li>
                    <li className={pokemons[2].data.name} onClick={() => CheckChoise(pokemons[2].data.name)}>{pokemons[2].data.name}</li>
                    <li className={pokemons[3].data.name} onClick={() => CheckChoise(pokemons[3].data.name)}>{pokemons[3].data.name}</li>
                  </ul>
                </div>
              </>
            }
          </>
        }
        {trys === 0 &&
          <>
            <div className='cardHow'>
              <Card Style={'Back'} />
            </div>
            <div className='alert'>
              <span>{horarioAtual}</span>
            </div>
          </>


        }


      </div>
    </>
  )
}

export default How