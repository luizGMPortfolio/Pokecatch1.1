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



const Rewards = ({ rewards, setRewards, user }) => {


    const { documents: posts } = useFetchDocuments("status", user.uid);
    const { updateDocument, response } = useUpdateDocument("status");


    const [id, setId] = useState()
    const [pokemons, setPokemons] = useState([])
    const [pokebolas, setPokebolas] = useState({})
    const [time, setTime] = useState([])


    useEffect(() => {
        if (posts) {
            console.log(posts[0])
            setPokemons([...posts[0].pokemons, rewards.pokemon.id])
            setPokebolas({
                pokebola: posts[0].pokebolas.pokebola + rewards.pokebolas.pokebolas.pokebola,
                great: posts[0].pokebolas.great + rewards.pokebolas.pokebolas.great,
                ultra: posts[0].pokebolas.ultra + rewards.pokebolas.pokebolas.ultra,
                master: posts[0].pokebolas.master + rewards.pokebolas.pokebolas.master
            })
            if (posts[0].time.length < 3) {
                setTime([...posts[0].time, rewards.pokemon])
            } else {
                setTime(posts[0].time)
            }
        }
    }, [posts])



    const handleUpdate = () => {

        const data = {
            pokemons,
            pokebolas,
            time
        }

        console.log(data)

        updateDocument(posts[0].id, data);

        console.log(response)

        setRewards(null)

    }


    return (
        <div className='inicial'>
            {rewards &&
                <div className='title'>
                    <h3>Catch</h3>
                    <h1>{rewards.pokemon.name}</h1>
                </div>
            }

            {!rewards &&
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
            <button onClick={() => handleUpdate()}>OK</button>

        </div>
    )
}

export default Rewards