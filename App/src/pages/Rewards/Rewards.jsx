//css
import './Rewards.css'

//hooks
import { useRandonPokemon } from '../../hooks/useRandonPokemon';
import { useRandonPokeball } from '../../hooks/useRandowPokeballs';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useFetchPokemons } from '../../hooks/useFetchPokemons';
import { useRewards } from '../../hooks/useRewards';
import { useState, useEffect } from 'react';

//context
import { useAuthValue } from "../../context/AuthContext";
//components
import Card from '../../components/Card';



const Rewards = ({ rewards, setRewards, user }) => {


    const { documents: itens } = useFetchDocuments("itens", user.uid);
    const { documents: status } = useFetchDocuments("status", user.uid);
    const { updateDocument: updateItens, response: ItensResponse } = useUpdateDocument("itens");
    const { updateDocument: updateStatus, response: StatusResponse } = useUpdateDocument("status");
    const { FetchPokemon } = useFetchPokemons()


    const [id, setId] = useState()
    const [pokemons, setPokemons] = useState([])
    const [pokebolas, setPokebolas] = useState({})
    const [time, setTime] = useState([])
    const [species, setSpecies] = useState(null)
    const [cards, setCards] = useState(0)
    const [legendary, setLegendary] = useState(0)



    useEffect(() => {

        async function getSpecies() {
            setSpecies(await FetchPokemon('pokemon-species', rewards.pokemon.id))
        }
        if (itens) {
            getSpecies()
            setPokemons([...itens[0].pokemons, rewards.pokemon.id])
            setPokebolas({
                pokebola: itens[0].pokebolas.pokebola + rewards.pokebolas.pokebolas.pokebola,
                great: itens[0].pokebolas.great + rewards.pokebolas.pokebolas.great,
                ultra: itens[0].pokebolas.ultra + rewards.pokebolas.pokebolas.ultra,
                master: itens[0].pokebolas.master + rewards.pokebolas.pokebolas.master
            })
            if (itens[0].time.length < 3) {
                setTime([...itens[0].time, rewards.pokemon])
            } else {
                setTime(itens[0].time)
            }
        }

    }, [itens])

    useEffect(() => {
        if (status) {
            setCards(status[0].cards)
            setLegendary(status[0].legendary)
        }
    }, [status])


    const handleUpdate = () => {

        const DataItens = {
            pokemons,
            pokebolas,
            time
        }
        updateItens(itens[0].id, DataItens);

        var count = 0
        if(species.is_legendary){
            count = count + 1 
        }

        const DataStatus = {
            cards: cards + 1,
            legendary: legendary + count
        }
        updateStatus(status[0].id, DataStatus);

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