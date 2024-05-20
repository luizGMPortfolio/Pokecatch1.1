//css
import './Register.css'
//imports
import logo from '../../assets/Icones/LogoPokecatch.png'

//hooks
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthentication } from '../../hooks/useAuthentication';
import { useInsertDocument } from "../../hooks/useInsertDocument";


//rewards
import { useRandonPokemon } from '../../hooks/useRandonPokemon';
import { useRandonPokeball } from '../../hooks/useRandowPokeballs';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useRewards } from '../../hooks/useRewards';




const Register = ({ setRewards }) => {


  const { RandonPokemon, pokemon, loading: Randonloading, error: Randonerror } = useRandonPokemon();
  const { RandonPokeball, pokebolas: Rpokebolas, loading: Rloading, error: Rerror } = useRandonPokeball();
  const { rewards, NewReward } = useRewards();


  const [displayName, setDisplayName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { createUser, error: authError, loading } = useAuthentication();
  const { insertDocument, response } = useInsertDocument("status");

  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("");

    const user = {
      displayName,
      email,
      password,
    }

    if (password !== ConfirmPassword) {
      setError('As senhas precisam ser iguais!');
      return
    }

    try {

      const res = await createUser(user)

      insertDocument({
        pokemons: [],
        pokebolas: {
          pokebola: 5,
          great: 0,
          ultra: 0,
          master: 0
        },
        time: [],
        uid: res.uid,
        createdBy: res.displayName,
      });


      const NewRewards = {
        pokemon: pokemon,
        pokebolas: Rpokebolas
      }

      setRewards(NewRewards)

    } catch (error) {
      console.log(error);
      setError(error.message);
    }

  };

  useEffect(() => {
    if (authError) {
      setError(authError)
    }

  }, [authError])
  useEffect(() => {
    RandonPokeball()
    RandonPokemon()
  }, [pokemon])


  return (

    <div className='Login'>

      <div className='logo'>
        <img src={logo} alt="" />
      </div>
      <div className='inputs'>
        <form onSubmit={handleSubmit}>
          <label>
            Usúario
            <input
              type="text"
              name='displayName'
              placeholder='Insira o nome de Usúario'
              value={displayName}
              required
              onChange={(e) => setDisplayName(e.target.value)} />
          </label>
          <label>
            E-mail
            <input
              type="email"
              name='email'
              placeholder='Insira seu E-mail'
              required
              value={email}
              onChange={(e) => setemail(e.target.value)} />
          </label>
          <label>
            Senha
            <input
              type="password"
              name='password'
              placeholder='Crie sua senha'
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)} />
          </label>
          <label>
            <span>Confirmação de senha:</span>
            <input
              type="password"
              name='confirmPassword'
              required
              placeholder='Confirme a sua senha'
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          {!loading &&
            <button className='btn'>Cadastrar</button>
          }
          {loading &&
            <button className='btn' disabled>Aguarde...</button>
          }
          {error && <p className='error'>{error}</p>}
          {response.error && <p className='error'>{error}</p>}
        </form>
        <div className='register'>
          <Link to='/'>Logar</Link>
        </div>
      </div>

    </div>


  )
}

export default Register