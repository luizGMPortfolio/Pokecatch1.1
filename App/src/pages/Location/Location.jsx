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

const Location = () => {

  const { id } = useParams();
  const { user } = useAuthValue();
  const [error, setError] = useState(null)

  const { documents: posts, loading } = useFetchDocuments("Configs", user.uid);
  const { FetchPokemon } = useFetchPokemons()
  const [Locations, setLocations] = useState()
  const [pokemons, setPokemons] = useState([])
  const [pokemon, setPokemon] = useState(null)
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
    if (posts) {
      switch (id) {
        case 'forest':
          setLocations(posts[0].locations.forest)
          break
        case 'cave':
          setLocations(posts[0].locations.cave)
          break
        case 'mountain':
          setLocations(posts[0].locations.mountain)
          break
        case 'beach':
          setLocations(posts[0].locations.beach)
          break
        case 'desert':
          setLocations(posts[0].locations.desert)
          break
        case 'vulcano':
          setLocations(posts[0].locations.vulcano)
          break
        case 'HantedHouse':
          setLocations(posts[0].locations.HantedHouse)
          break
      }

    }
  }, [posts])


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

    </div>
  )
}

export default Location