//css
import './Pokedex.css'
//hooks
import React, { useRef, useState, useEffect } from 'react';
import { useFetchPokemons } from '../../hooks/useFetchPokemons';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
//imports
import axios from 'axios';
//components
import Card from '../../components/Card';
import Navbar from '../../components/Navbar';
import Info from '../../components/Info';
//context
import { useAuthValue } from '../../context/AuthContext'
import { useListValue } from '../../context/ListContext'



function Pokedex() {

  const [show, setShow] = useState('');
  const [type, setType] = useState('type');
  const [Gen, setGen] = useState('Generations');
  const [Region, setRegion] = useState('Region');
  const [aba, setAba] = useState('seus');
  const [info, setInfo] = useState(null)
  const [OurPokemons, setOurPokemons] = useState([])
  const [Duplicate, setDuplicate] = useState([])
  const [quant, setQuant] = useState(0)
  const { loading, erro } = useFetchPokemons();
  const { List } = useListValue();
  const { user } = useAuthValue();

  const { documents: posts } = useFetchDocuments("itens", user.uid);



  useEffect(() => {
    if (posts) {
      setDuplicate(getDuplicateCounts(posts[0].pokemons))
      setOurPokemons(posts[0].pokemons.filter((item, index) => posts[0].pokemons.indexOf(item) === index))
    }
  }, [posts])

  function VerifyPokemon(id) {
    var igual = false
    OurPokemons.map((OurPokemon) => {
      if (OurPokemon === id) {
        igual = true
      }
    })
    return igual
  }
  function DuplicatePokemon(id) {
    var igual = false
    var q = 0
    Duplicate.map((item) => {
      if (item[0] == id) {
        igual = true
        q = item[1]
      }

    })

    return q
  }
  const getDuplicateCounts = (arr) => {
    const counts = arr.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).filter(([item, count]) => count > 1);
  };

  if (info) {
    return <Info num={info} setInfo={setInfo} />
  }



  return (
    <>
      <Navbar />
      <div className='pokedex'>
        <div className='filters'>
          <div className='Search'>
            <input type="text" placeholder='Search' />
          </div>

          <div className='filter'>
            <div className='f-types' onMouseMove={() => setShow('type')} onMouseLeave={() => setShow('')}>
              <div className={`select ${type != 'type' ? type : 'type'}`}>
                <h4>{type}</h4>
              </div>
              <ul name="options" id="options" className={`options ${show === 'type' ? 'show' : ''}`}>
                <li value="water" onClick={() => setType('type')} className='type'>type</li>
                <li value="water" onClick={() => setType('water')} className='water'>water</li>
                <li value="glass" onClick={() => setType('grass')} className='grass'>grass</li>
                <li value="fire" onClick={() => setType('fire')} className='fire'>fire</li>
                <li value="fire" onClick={() => setType('electric')} className='electric'>electric</li>
                <li value="Flying" onClick={() => setType('flying')} className='flying'>Flying</li>
                <li value="Fighting" onClick={() => setType('fighting')} className='fighting'>Fighting</li>
                <li value="Poison" onClick={() => setType('poison')} className='poison'>Poison</li>
                <li value="Ground" onClick={() => setType('ground')} className='ground'>Ground</li>
                <li value="Rock" onClick={() => setType('rock')} className='rock'>Rock</li>
                <li value="Psychic" onClick={() => setType('psychic')} className='psychic'>Psychic</li>
                <li value="Ice" onClick={() => setType('ice')} className='ice'>Ice</li>
                <li value="Bug" onClick={() => setType('bug')} className='bug'>Bug</li>
                <li value="Ghost" onClick={() => setType('ghost')} className='ghost'>Ghost</li>
                <li value="Steel" onClick={() => setType('steel')} className='steel'>Steel</li>
                <li value="Dragon" onClick={() => setType('dragon')} className='dragon'>Dragon</li>
                <li value="Dark" onClick={() => setType('dark')} className='dark'>Dark</li>
                <li value="Fairy" onClick={() => setType('fairy')} className='fairy'>Fairy </li>
              </ul>
            </div>
            <div className='f-generations' onMouseMove={() => setShow('Generations')} onMouseLeave={() => setShow('')}>
              <div className={`select ${Gen != 0 ? Gen : ''} Generations`}>
                <h4>{Gen != 'Generations' ? `${Gen}° Gen` : 'Generations'}</h4>
              </div>
              <ul name="options" id="options" className={`options ${show === 'Generations' ? 'show' : ''}`}>
                <li value="1" onClick={() => setGen('Generations')} className=''>Generations</li>
                <li value="1" onClick={() => setGen(1)} className=''>1° Gen</li>
                <li value="2" onClick={() => setGen(2)} className=''>2° Gen</li>
                <li value="3" onClick={() => setGen(3)} className=''>3° Gen</li>
                <li value="4" onClick={() => setGen(4)} className=''>4° Gen</li>
                <li value="5" onClick={() => setGen(5)} className=''>5° Gen</li>
                <li value="6" onClick={() => setGen(6)} className=''>6° Gen</li>
                <li value="7" onClick={() => setGen(7)} className=''>7° Gen</li>
                <li value="8" onClick={() => setGen(8)} className=''>8° Gen</li>
                <li value="9" onClick={() => setGen(9)} className=''>9° Gen</li>
              </ul>
            </div>
            <div className='f-Region' onMouseMove={() => setShow('Region')} onMouseLeave={() => setShow('')}>
              <div className={`select ${Region != 'Region' ? Region : 'Region'} Region`}>
                <h4>{Region}</h4>
              </div>
              <ul name="options" id="options" className={`options ${show === 'Region' ? 'show' : ''}`}>
                <li value="Region" onClick={() => setRegion('Region')}>Region</li>
                <li value="number" onClick={() => setRegion('by number')}>By number</li>
                <li value="cresente" onClick={() => setRegion('Cresente')}>cresente</li>
                <li value="decresente" onClick={() => setRegion('Degresente')}>degresente</li>
                <li value="Alfabect" onClick={() => setRegion('Alfabetc')}>Alfabetc</li>
              </ul>

            </div>
          </div>
        </div>
        <div className='list'>
          <div className='abas'>
            <div className={`seus ${aba === 'seus' ? 'activeAba' : ''}`} onClick={() => setAba('seus')}>
              <h2>Seus Pokemons</h2>
            </div>
            <div className={`all ${aba === 'all' ? 'activeAba' : ''}`} onClick={() => setAba('all')}>
              <h2>Todos</h2>
            </div>
          </div>
          <div className='cards'>



            {!loading &&
              <>
                {List && List.map((pokemon) => (
                  <>
                    {aba === 'seus' && OurPokemons.map((OurPokemon) => (
                      <>
                        {OurPokemon === pokemon.id &&
                          <>
                            {DuplicatePokemon(OurPokemon) ? (
                              <Card
                                name={pokemon.name}
                                img={pokemon.sprites.other["official-artwork"].front_default}
                                types={pokemon.types}
                                num={pokemon.id}
                                setInfo={setInfo}
                                quantidade={DuplicatePokemon(OurPokemon)}
                              />
                            ) : (
                              <Card
                                name={pokemon.name}
                                img={pokemon.sprites.other["official-artwork"].front_default}
                                types={pokemon.types}
                                num={pokemon.id}
                                setInfo={setInfo}
                              />
                            )

                            }
                          </>
                        }
                      </>
                    ))}
                    {aba === 'all' &&
                      <>
                        {VerifyPokemon(pokemon.id) ? (
                          <Card
                            name={pokemon.name}
                            img={pokemon.sprites.other["official-artwork"].front_default}
                            types={pokemon.types}
                            num={pokemon.id}
                            setInfo={setInfo}
                          />
                        ) : (
                          <Card
                            name={pokemon.name}
                            img={pokemon.sprites.other["official-artwork"].front_default}
                            types={pokemon.types}
                            num={pokemon.id}
                            Style={'Uncatch'}
                          />
                        )

                        }
                      </>
                    }
                  </>
                ))}
              </>

            }
            {loading &&
              <div className='loading'>
                <Card Style={'Back'} />
                <Card Style={'Back'} />
                <Card Style={'Back'} />
                <Card Style={'Back'} />
                <Card Style={'Back'} />
                <Card Style={'Back'} />
                <Card Style={'Back'} />
                <Card Style={'Back'} />
                <Card Style={'Back'} />
                <Card Style={'Back'} />
                <Card Style={'Back'} />
                <Card Style={'Back'} />
              </div>}

          </div>
        </div>
      </div>
    </>

  )
}

export default Pokedex



