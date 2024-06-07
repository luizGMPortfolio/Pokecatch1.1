
//css
import './Profile.css'

//hooks
import React, { useRef, useState, useEffect } from 'react';
import { useAuthValue } from '../../context/AuthContext';
import { useAuthentication } from '../../hooks/useAuthentication'
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useRandonPokeball } from '../../hooks/useRandowPokeballs';
import { useLocationsChange } from '../../hooks/useLocationsChange'
//imports
import Imguser from '../../assets/Icones/user.png';


//components
import Card from '../../components/Card';
import Navbar from '../../components/Navbar'
import Modal from '../../components/Modal';

const Profile = () => {

  const [time, setTime] = useState([])
  const [pokebolas, setPokebolas] = useState()
  const { user } = useAuthValue();
  const [perfil, setPerfil] = useState()
  const [backcards, setBackcards] = useState()
  const [ConfigId, setConfigId] = useState()
  const [display, setDisplay] = useState('none')

  const { logout } = useAuthentication();
  const { documents: itens, loading } = useFetchDocuments("itens", user.uid);
  const { documents: status } = useFetchDocuments('status', user.uid);
  const { documents: Configs } = useFetchDocuments('Configs', user.uid);
  const { BackCards } = useLocationsChange()
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
  useEffect(() => {
    if (Configs && BackCards) {
      setBackcards(BackCards[Configs[0].BackCard])
      setConfigId(Configs[0].id)
    }
  }, [Configs, BackCards])


  return (
    <>
      <Navbar />
      <Modal display={display} setDisplay={setDisplay} backcards={BackCards}/>
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
          {/*<div className='Equipe'>
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

        </div>*/}
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
        {/*<div className='changeBackcard'>
          <div className='CB-Back'>
            <h3>BackCard</h3>
            {BackCards &&
              <img src={backcards} alt="" />
            }

          </div>
          <div className='EquipeB'>
            <button onClick={() => setDisplay('flex')}>Alterar</button>
          </div>
        </div>*/}
        <button onClick={logout} className='exit'>Sair</button>
      </div>
    </>

  )
}

export default Profile