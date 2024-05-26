//css
import './Profile.css'

//hooks
import React, { useRef, useState, useEffect } from 'react';
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
//imports
import Imguser from '../../assets/Icones/user.png';

//components
import Card from '../../components/Card';
import Navbar from '../../components/Navbar'

const Profile = () => {

  const [time, setTime] = useState([])
  const { user } = useAuthValue();
  const { documents: posts, loading } = useFetchDocuments("status", user.uid);

  useEffect(() => {
    if (posts) {
      console.log(posts[0])
      setTime(posts[0].time)
    }
  }, [posts])

  return (
    <>
      <Navbar />
      <div className='Use'>
        <div className='perfil'>
          <div className='p-top'>
            <img src={Imguser} alt="" />
            <h2>{user.displayName}</h2>
          </div>
          <div className='p-bottom'>
            <div className='OurCards'>
              <h3>Cards</h3>
              <span>30</span>
            </div>
            <div className='Allcards'>
              <h3>Enconters</h3>
              <span>45</span>
            </div>
            <div className='lendarias'>
              <h3>Lendarias</h3>
              <span>2</span>
            </div>
          </div>
        </div>
        <div className='Equipe'>
          <h3>Equipe</h3>
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
        <div className='changeBackcard'>
          <div className='CB-Back'>
            <h3>BackCard</h3>
            <img src="https://lh5.googleusercontent.com/proxy/WthF44jrTiMwG3d5PGLmCsA_-EUHXiyfC0MYx5zPKqyqoNDBhSQm_iMaQNIbIAdBvvaj-002c71zlR8CDYnSY35MtU2XB9wct66pV9VNWSvjhIoXeVEBjYv3jMVOhropyAu87Bd5" alt="" />
          </div>
          <div className='CB-button'>
            <button>Alterar</button>
          </div>
        </div>
      </div>
    </>

  )
}

export default Profile