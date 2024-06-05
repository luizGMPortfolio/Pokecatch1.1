//css
import './Location.css'


//hooks
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFetchPokemons } from '../../hooks/useFetchPokemons';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useRandonPokeball } from '../../hooks/useRandowPokeballs';
import { Time } from '../../hooks/useTime'
//context
import { useAuthValue } from '../../context/AuthContext';
//imports
import blackPoke from '../../assets/Icones/BlackPokeball.png'

const Location = ({setRewards}) => {

  const { id } = useParams();
  const { user } = useAuthValue();
  const [error, setError] = useState(null)

  const { documents: Configs, loading } = useFetchDocuments("Configs", user.uid);
  const { documents: Itens } = useFetchDocuments("itens", user.uid);
  const { updateDocument: updateItens, response: itensResponse } = useUpdateDocument("itens");
  const { RandonPokeball, pokebolas: Rpokebolas, loading: Rloading, error: Rerror } = useRandonPokeball();
  const { FetchPokemon } = useFetchPokemons()

  const [Locations, setLocations] = useState()
  const [pokemons, setPokemons] = useState([])
  const [pokemon, setPokemon] = useState(null)
  const [capture_rate, setcapture_rate] = useState(null)
  const [pokebolas, setPokebolas] = useState(null)

  const [active, setActive] = useState(false)
  const { horarioAtual } = Time();

  const GetPokemon = async () => {
    try {
      const num = Math.floor(Math.random() * 9)
      const info = []

      for (let index = 0; index < 9; index++) {
        const p = await FetchPokemon('pokemon', Locations[index])

        if (num === index) {
          setPokemon(p)
          const i = await FetchPokemon('pokemon-species', Locations[index])
          setcapture_rate(i.capture_rate)
        }
        info.push(p)
      }
      setPokemons(info)
    } catch (error) {
      console.log(error);
      setError(error.message);
    }


  }

  useEffect(() => {
    RandonPokeball()
  }, [])
  useEffect(() => {
    if (Configs) {
      switch (id) {
        case 'forest':
          setLocations(Configs[0].locations.forest)
          break
        case 'cave':
          setLocations(Configs[0].locations.cave)
          break
        case 'mountain':
          setLocations(Configs[0].locations.mountain)
          break
        case 'beach':
          setLocations(Configs[0].locations.beach)
          break
        case 'desert':
          setLocations(Configs[0].locations.desert)
          break
        case 'vulcano':
          setLocations(Configs[0].locations.vulcano)
          break
        case 'HantedHouse':
          setLocations(Configs[0].locations.HantedHouse)
          break
      }

    }
  }, [Configs])

  useEffect(() => {
    if (Itens) {
      setPokebolas(Itens[0].pokebolas)
    }
  }, [Itens])

  useEffect(() => {
    if (Locations) {
      GetPokemon();
    }
  }, [Locations])



  const TryCatch = (pokeball) => {
    var data = {}
    var difficulty = 0;
    const num = Math.floor(Math.random() * 120);

    if (capture_rate > 70) {
      difficulty = 30
    }
    else {
      difficulty = capture_rate - 30
    }


    switch (pokeball) {
      case 'great':
        data = {
          pokemons: Itens[0].pokemons,
          pokebolas: {
            pokebola: pokebolas.pokebola,
            great: pokebolas.great - 1,
            ultra: pokebolas.ultra,
            master: pokebolas.master
          },
          time: Itens[0].time
        }
        difficulty = difficulty + 15
        break
      case 'ultra':
        data = {
          pokemons: Itens[0].pokemons,
          pokebolas: {
            pokebola: pokebolas.pokebola,
            great: pokebolas.great,
            ultra: pokebolas.ultra - 1,
            master: pokebolas.master
          },
          time: Itens[0].time
        }
        difficulty = difficulty + 30
        break
      case 'master':
        data = {
          pokemons: Itens[0].pokemons,
          pokebolas: {
            pokebola: pokebolas.pokebola,
            great: pokebolas.great,
            ultra: pokebolas.ultra,
            master: pokebolas.master - 1
          },
          time: Itens[0].time
        }
        difficulty = +1000
        break
      default:
        data = {
          pokemons: Itens[0].pokemons,
          pokebolas: {
            pokebola: pokebolas.pokebola - 1,
            great: pokebolas.great,
            ultra: pokebolas.ultra,
            master: pokebolas.master
          },
          time: Itens[0].time
        }
        break
    }

    updateItens(Itens[0].id, data);

    if (num < difficulty) {
      console.log('Catch! number:' + num + ' Base difficulty:' + difficulty)
      const NewRewards = {
        pokemon: pokemon,
        pokebolas: Rpokebolas
      }
      setRewards(NewRewards)
    }
    else {
      console.log('No catch! number:' + num + ' Base difficulty:' + difficulty)
    }

  }


  return (
    <div className={`location ${id}`}>
      <header>
        <div className='ContagemLocation'>
          <span className='text'>Next update</span>
          <span className='time'>{horarioAtual}</span>
        </div>
        <div className='back'>
          <Link to='/'><span class="material-symbols-outlined">
            arrow_back
          </span></Link>
        </div>
      </header>
      <div className='possibilities'>

        <div className="list">
          {pokemons && pokemons.map((item) => (
            <img src={item.sprites.other["official-artwork"].front_default} alt="" />
          ))}
        </div>

      </div>
      <div className='enconter'>
        {pokemon &&
          <img src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
        }
      </div>
      <menu className='menu'>

        <div className={`pokeball ${active ? 'cliked' : ''}`}>
          {pokebolas &&
            <>
              <div onClick={() => TryCatch('ultra')} className={`${active ? '' : 'hide'} ultra`}>
                <span>{pokebolas.ultra}</span>
              </div>
              <div onClick={() => TryCatch('great')} className={`${active ? '' : 'hide'} great`}>
                <span>{pokebolas.great}</span>
              </div>

              <img onClick={() => setActive(active ? false : true)} className={` ${active ? 'clikedImg' : ''}`} src={blackPoke} alt="" />

              <div onClick={() => TryCatch('pokeball')} className={`${active ? '' : 'hide'} pokebola`}>
                <span>{pokebolas.pokebola}</span>
              </div>
              <div onClick={() => TryCatch('master')} className={`${active ? '' : 'hide'} master`}>
                <span>{pokebolas.master}</span>
              </div>

            </>
          }

        </div>
      </menu>

    </div>
  )
}

export default Location