//css
import './Rewards.css'

//hooks
import { useRandonPokemon } from '../../hooks/useRandonPokemon';
import { useRandonPokeball } from '../../hooks/useRandowPokeballs';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useRewards } from '../../hooks/useRewards';
import { useState, useEffect } from 'react';

//context
import { useAuthValue } from "../../context/AuthContext";
//components
import Card from '../../components/Card';



const Rewards = ({rewards, setRewards}) => {

    const { RandonPokemon, pokemon, loading: Randonloading, error: Randonerror } = useRandonPokemon();
    const { RandonPokeball, pokebolas: Rpokebolas, loading: Rloading, error: Rerror } = useRandonPokeball();





    const [id, setId] = useState()
    const [pokemons, setPokemons] = useState([])
    const [pokebolas, setPokebolas] = useState({})
    const [time, setTime] = useState([])


    useEffect(() => {
        RandonPokeball()
        RandonPokemon()
      }, [pokemon])

    const data = {
        pokemons,
        pokebolas,
        time
    }

    console.log(rewards)



    return (
        <div className='inicial'>
            {rewards &&
                <div className='title'>
                    <h3>Catch</h3>
                    <h1>{rewards.pokemon.name}</h1>
                </div>
            }

            {Randonloading &&
                <Card Style={'Back'} />
            }
            {rewards &&
                <Card
                    name={rewards.pokemon.name}
                    img={rewards.pokemon.sprites.other["official-artwork"].front_default}
                    types={rewards.pokemon.types}
                    num={rewards.pokemon.id}
                />
            }
            <footer>
                <span>+</span>
                {rewards.pokebolas.imagem &&
                    <div className='items'>
                        <img src={rewards.pokebolas.imagem} alt="" />
                        <span>x{rewards.pokebolas.quantidade}</span>
                    </div>
                }
            </footer>
            <button onClick={() => setRewards(null)}>OK</button>

        </div>
    )
}

export default Rewards