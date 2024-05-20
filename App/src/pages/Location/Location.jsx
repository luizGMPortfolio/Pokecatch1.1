//css
import './Location.css'

//hooks
import { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const Location = () => {

  const { id } = useParams();

  return (
    <div className={`location ${id}`}>
      <header>
        <div className='ContagemLocation'>
          <span className='text'>Next update</span>
          <span className='time'>03:20:05</span>
        </div>
        <div className='back'>
          <Link to='/'><span class="material-symbols-outlined">
            arrow_back
          </span></Link>
        </div>
      </header>
      <div className='possibilities'>

        <div className="list">
          <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'></img>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png" alt="" />
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png" alt="" />
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/66.png" alt="" />
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/841.png" alt="" />
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" alt="" />
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png" alt="" />
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/310.png" alt="" />
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/544.png" alt="" />
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/464.png" alt="" />
        </div>
      </div>
      <div className='enconter'>
        <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png'></img>
      </div>

    </div>
  )
}

export default Location