//css
import './Home.css'

//hooks
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Time from '../../hooks/Time';

//imports
import pinheiro from '../../assets/Icones/pinheiro.png'
import caverna from '../../assets/Icones/caverna.png'
import praia from '../../assets/Icones/praia.png'
import montanha from '../../assets/Icones/montanha.png'
import cacto from '../../assets/Icones/cacto.png'
import vulção from '../../assets/Icones/vulção.png'
import Hanted from '../../assets/Icones/Hanted.png'

//context
import { useAuthValue } from '../../context/AuthContext'

//components
import Navbar from '../../components/Navbar';

import { useNavigate, useParams } from "react-router-dom";


const Home = () => {

  const { user } = useAuthValue();
  const uid = user.uid;

  return (
    <>
      <Navbar />
      <div className='Home'>
        <div className='Contagem'>
          <span className='text'>Next update</span>
          <Time />
        </div>
        <div className='Locais'>
          <ul>
            <Link to='/Location/forest'><li className='floresta'><img src={pinheiro} alt="" /> </li></Link>
            <Link to='/Location/cave'><li className='caverna'><img src={caverna} alt="" /></li></Link>
            <Link to='/Location/beach'><li className='praia'><img src={praia} alt="" /></li></Link>
            <Link to='/Location/mountain'><li className='montanha'><img src={montanha} alt="" /></li></Link>
            <Link to='/Location/desert'><li className='deserto'><img src={cacto} alt="" /></li></Link>
            <Link to='/Location/vulcano'><li className='vulção'><img src={vulção} alt="" /></li></Link>
            <Link to='/Location/HantedHouse'><li className='asombrado'><img src={Hanted} alt="" /></li></Link>
          </ul>
        </div>
      </div>
    </>

  )
}

export default Home