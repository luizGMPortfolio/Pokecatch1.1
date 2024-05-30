//css
import './Profile.css'

//hooks
import React, { useRef, useState, useEffect } from 'react';
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useRandonPokeball } from '../../hooks/useRandowPokeballs';
//imports
import Imguser from '../../assets/Icones/user.png';

//components
import Card from '../../components/Card';
import Navbar from '../../components/Navbar'

const Profile = () => {

  const [time, setTime] = useState([])
  const [pokebolas, setPokebolas] = useState()
  const { user } = useAuthValue();
  const [perfil, setPerfil] = useState()
  const { documents: itens, loading } = useFetchDocuments("itens", user.uid);
  const { documents: status } = useFetchDocuments('status', user.uid);
  const { PokeballsImage } = useRandonPokeball()


  useEffect(() => {
    if (itens) {
      console.log(itens[0])
      setTime(itens[0].time)
      setPokebolas(itens[0].pokebolas)
    }
  }, [itens])
  useEffect(() => {
    if (status) {
      setPerfil(status[0])
    }
  }, [status])

  return (
    <>
      <Navbar />
      <div className='Use'>
        <div className='perfil'>
          <div className='p-top'>
            <img src={Imguser} alt="" />
            <h3>{user.displayName}</h3>
          </div>
          <div className='p-bottom'>
            <div className='OurCards'>
              <h2>Cards</h2>
              <span>{perfil && perfil.cards}</span>
            </div>
            <div className='Allcards'>
              <h2>Enconters</h2>
              <span>{perfil && perfil.enconters}</span>
            </div>
            <div className='lendarias'>
              <h2>Legendary</h2>
              <span>{perfil && perfil.legendary}</span>
            </div>
          </div>
        </div>
        <div className='Equipe'>
          <h3>Sua equipe</h3>
          <div className='cards'>
            {!loading &&
              time.map((pokemon) => (
                <Card
                  name={pokemon.name}
                  img={pokemon.sprites.other["official-artwork"].front_default}
                  types={pokemon.types}
                  num={pokemon.id}
                />
              ))

            }
          </div>
          <div className='EquipeB'>
            <button>Alterar</button>
          </div>

        </div>
        <div className='itens'>
          <h3>Itens</h3>
          <ul>
            <li>
              <img src={PokeballsImage().pokebola} alt="" />
              <span>{pokebolas && pokebolas.pokebola}</span>
              </li>
            <li>
              <img src={PokeballsImage().great} alt="" />
              <span>{pokebolas && pokebolas.great}</span>
            </li>
            <li>
              <img src={PokeballsImage().ultra} alt="" />
              <span>{pokebolas && pokebolas.ultra}</span>
            </li>
            <li>
              <img src={PokeballsImage().master} alt="" />
              <span>{pokebolas && pokebolas.master}</span>
            </li>
          </ul>
        </div>
        <div className='changeBackcard'>
          <div className='CB-Back'>
            <h3>BackCard</h3>
            <img src="https://lh5.googleusercontent.com/proxy/WthF44jrTiMwG3d5PGLmCsA_-EUHXiyfC0MYx5zPKqyqoNDBhSQm_iMaQNIbIAdBvvaj-002c71zlR8CDYnSY35MtU2XB9wct66pV9VNWSvjhIoXeVEBjYv3jMVOhropyAu87Bd5" alt="" />
          </div>
          <div className='EquipeB'>
            <button>Alterar</button>
          </div>
        </div>
        <button className='exit'>Sair</button>
      </div>
    </>

  )
}

export default Profile