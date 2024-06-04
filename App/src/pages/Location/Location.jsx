//css
import './Location.css'


//hooks
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFetchPokemons } from '../../hooks/useFetchPokemons';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { Time } from '../../hooks/useTime'
//context
import { useAuthValue } from '../../context/AuthContext';
//imports
import blackPoke from '../../assets/Icones/BlackPokeball.png'

const Location = () => {

  const { id } = useParams();
  const { user } = useAuthValue();
  const [error, setError] = useState(null)

  const { documents: Configs, loading } = useFetchDocuments("Configs", user.uid);
  const { documents: Itens } = useFetchDocuments("itens", user.uid);
  const { FetchPokemon } = useFetchPokemons()

  const [Locations, setLocations] = useState()
  const [pokemons, setPokemons] = useState([])
  const [pokemon, setPokemon] = useState(null)
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
          {active &&
            <>
              <div className='ultra'>
                <span>{pokebolas.ultra}</span>
              </div>
              <div className='great'>
                <span>{pokebolas.great}</span>
              </div>
            </>
          }
          <img onClick={() => setActive(active ? false : true)} className={` ${active ? 'clikedImg' : ''}`} src={blackPoke} alt="" />
          {active &&
            <>
              <div className='pokebola'>
                <span>{pokebolas.pokebola}</span>
              </div>
              <div className='master'>
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