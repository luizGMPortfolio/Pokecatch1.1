import './Card.css'


function Card({ name, img, types, num, Style, setInfo, quantidade, backcard }) {

  function Rederect() {
    setInfo(num)
  }

  return (

    <>

      {!Style &&
        <div className='card' onClick={Rederect}>
          <div className='name'>
            <h3 style={{ fontSize: `${name > 12 ? '11px' : '15px'}` }}>{name}</h3>
          </div>
          <div className='img'>
            <img src={img} alt="" />
          </div>
          <div className='types'>
            {types && types.map(type => (
              <div className={`type1 ${type.type.name}`}>
                <span>{type.type.name}</span>
              </div>
            ))}
          </div>
          <div className='num'>
            <span>N°{num}</span>
          </div>
          {quantidade &&
            <div className='duplicate'>
              <span>{quantidade}x</span>
            </div>
          }
        </div>
      }

      {Style == 'Uncatch' &&
        <div className='card ocult'>
          <div className='name'>
            <h3>?????</h3>
          </div>
          <div className='img'>
            <img src={img} alt="" className='ocultImg' />
          </div>
          <div className='types'>
            {types && types.map(type => (
              <div className={`type1 ${type.type.name}`}>
                <span>{type.type.name}</span>
              </div>
            ))}
          </div>
          <div className='num'>
            <span>N°{num}</span>
          </div>
        </div>
      }
      {Style === 'Ocult' &&
        <div className='card ocult'>
          <div className='name'>
            <h3>?????</h3>
          </div>
          <div className='img'>
            <img src={img} alt="" className='ocultImg' />
          </div>
          <div className='types'>
            {types && types.map(type => (
              <div className={`type1`}>
                <span>?????</span>
              </div>
            ))}
          </div>
          <div className='num'>
            <span>N°?</span>
          </div>
        </div>
      }
      {Style === 'Back' &&
        <div className='backcard'>
          <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_759,h_1053/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA' alt="" />
        </div>
      }
      {Style === 'List' &&
        <div className='backcard'>
          <img src={img} alt="" />
        </div>
      }
    </>


  )
}

export default Card