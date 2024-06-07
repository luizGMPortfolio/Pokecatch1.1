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

const Location = ({ setRewards }) => {

  const { id } = useParams();
  const { user } = useAuthValue();
  const [error, setError] = useState(null)

  const { documents: Configs } = useFetchDocuments("Configs", user.uid);
  const { documents: status } = useFetchDocuments("status", user.uid);
  const { documents: Itens } = useFetchDocuments("itens", user.uid);
  const { updateDocument: updateItens, response: itensResponse } = useUpdateDocument("itens");
  const { updateDocument: updateStatus, response: statusResponse } = useUpdateDocument("status");
  const { RandonPokeball, pokebolas: Rpokebolas, loading: Rloading, error: Rerror } = useRandonPokeball();
  const { FetchPokemon } = useFetchPokemons()

  const [Locations, setLocations] = useState()

  const [pokemons, setPokemons] = useState([])
  const [pokemon, setPokemon] = useState(null)
  const [ImgPokeball, setImgPokeball] = useState(null)
  const [capture_rate, setcapture_rate] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false);
  const [pokebolas, setPokebolas] = useState(null)
  const [enconters, setEnconters] = useState(null)
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
    if (status) {
      setEnconters(status[0].enconters)
      if (!enconters) {
        const data = {
          enconters: status[0].enconters + 1
        }

        updateStatus(status[0].id, data);
      }
    }
  }, [status])

  useEffect(() => {
    if (Locations) {
      GetPokemon();
    }
  }, [Locations])



  const TryCatch = (pokeball) => {
    void document.getElementById('check').classList.remove('animation2')
    var data = null
    var difficulty = 0;
    const num = Math.floor(Math.random() * 100);

    if (capture_rate > 70) {
      difficulty = 30
    }
    else {
      difficulty = capture_rate - 20
      if(difficulty < 1){
        difficulty = 1
      }
    }


    switch (pokeball) {
      case 'great':
        if (pokebolas.great != 0) {
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
        }
 
        difficulty = difficulty + 10
        break
      case 'ultra':
        if (pokebolas.ultra != 0) {
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
        }

        difficulty = difficulty + 25
        break
      case 'master':
        if (pokebolas.master != 0) {
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
        }

        difficulty = +1000
        break
      default:
        if (pokebolas.pokebola != 0) {
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
        }
        break
    }

    if (data) {
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
        void document.getElementById('pokeEnconter').classList.remove('PokCatch')
        console.log('No catch! number:' + num + ' Base difficulty:' + difficulty)
      }
    }




  }

  function startAnimation(clas) {
    if (pokebolas[clas] != 0) {
      setImgPokeball(clas)
      setIsAnimating(false);
      void document.getElementById('throwPokeball').offsetWidth;

      setIsAnimating(true);
    }
    else {
      console.log('sem Pokebolas')
    }

  }
  function endAnimation() {
    setIsAnimating(false);

  }
  const handleAnimationEnd = () => {
    setIsAnimating(false);
    void document.getElementById('pokeEnconter').classList.add('PokCatch')
    void document.getElementById('check').offsetWidth;
    void document.getElementById('check').classList.add('animation2')
  };

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
          <img id='pokeEnconter' src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
        }
      </div>
      <menu className='menu'>

        <div className={`pokeball ${active ? 'cliked' : ''}`}>
          {pokebolas &&
            <>
              <div
                onClick={() => startAnimation('ultra')}
                className={`${active ? '' : 'hide'} ultra ${pokebolas.ultra === 0 ? 'vazio' : ''}`}
                onAnimationEnd={() => TryCatch('ultra')}
              >
                <span>{pokebolas.ultra}</span>
              </div>

              <div
                onClick={() => startAnimation('great')}
                className={`${active ? '' : 'hide'} great ${pokebolas.great === 0 ? 'vazio' : ''}`}
              >
                <span>{pokebolas.great}</span>
              </div>

              <img
                onClick={() => setActive(active ? false : true)}
                className={` ${active ? 'clikedImg' : ''}`} src={blackPoke} alt="" />

              <div
                onClick={() => startAnimation('pokebola')}
                className={`${active ? '' : 'hide'} pokebola ${pokebolas.pokebola === 0 ? 'vazio' : ''}`}
                onAnimationEnd={() => TryCatch('pokebola')}
              >
                <span>{pokebolas.pokebola}</span>
              </div>

              <div
                onClick={() => startAnimation('master')}
                className={`${active ? '' : 'hide'} master ${pokebolas.master === 0 ? 'vazio' : ''}`}
                onAnimationEnd={() => TryCatch('master')}
              >
                <span>{pokebolas.master}</span>
              </div>
            </>
          }

        </div>
      </menu>
      {pokebolas &&
        <>
          <div
            id='throwPokeball'
            className={`throwPokeball ${isAnimating ? 'animation' : ''} ${ImgPokeball}`}
            onAnimationEnd={() => handleAnimationEnd()}
          ></div>

          <div 
          id='check' 
          className={`check ${ImgPokeball}`}
          onAnimationEnd={() => TryCatch(ImgPokeball)}
          ></div>
        </>

      }

    </div>
  )
}

export default Location