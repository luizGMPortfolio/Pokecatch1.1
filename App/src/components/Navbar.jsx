//css
import './Navbar.css'

//hooks
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';

//imports
import world from '../assets/Icones/world.png'
import interrogação from '../assets/Icones/interrogação.png'
import pokedex from '../assets/Icones/pokedex.png'
import usuario from '../assets/Icones/usuario.png'

import pokebola from '../assets/pokebolas/padão.svg'
import great from '../assets/pokebolas/greatBall.svg'
import ultra from '../assets/pokebolas/ultraBall.svg'
import quick from '../assets/pokebolas/quickBall.svg'
import timer from '../assets/pokebolas/timerBall.svg'
import premium from '../assets/pokebolas/premiumBall.svg'
import luxury from '../assets/pokebolas/luxuryBall.svg'
import master from '../assets/pokebolas/masterBall.svg'
import cards from '../assets/Icones/cards.png'
import items from '../assets/Icones/items.png'


const Navbar = () => {
  return (
    <div className='header'>
      <menu className='main'>
        <NavLink to='/' activeClassName='active'><li><img src={world} alt="" /></li></NavLink>
        <NavLink to='/How' activeClassName='active'><li><img src={interrogação} alt="" /></li></NavLink>
        <NavLink to='/Pokedex' activeClassName='active'><li><img src={pokedex} alt="" /></li></NavLink>
        <NavLink to='/profile' activeClassName='active'><li><img src={usuario} alt="" /></li></NavLink>
      </menu>
    </div>
  )
}

export default Navbar