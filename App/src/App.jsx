//css
import './App.css'

//imports
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
import { useFetchDocuments } from './hooks/useFetchDocuments.jsx';
import { useFetchPokemons } from './hooks/useFetchPokemons.jsx';
import { useLocationsChange } from './hooks/useLocationsChange.jsx';
import { useUpdateDocument } from './hooks/useUpdateDocument.jsx';
import { Time } from './hooks/useTime.jsx';


//context
import { AuthProvider } from './context/AuthContext';
import { ListProvider } from './context/ListContext.jsx';

//pages
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home.jsx';
import Pokedex from './pages/Pokedex/Pokedex.jsx';
import How from './pages/How/How.jsx';
import Rewards from './pages/Rewards/Rewards.jsx';
import Location from './pages/Location/Location.jsx';
//components
import Profile from './pages/profile/Profile.jsx';

function App() {

  const [user, setUser] = useState(undefined)
  const [rewards, setRewards] = useState(null);
  const { DiaAtual } = Time();

  const { auth } = useAuthentication();
  const { List } = useFetchPokemons();

  const { documents: Configs, loading } = useFetchDocuments("Configs", auth.uid);
  const { updateDocument: updateConfigs, response: ConfigsResponse } = useUpdateDocument("Configs");
  const { location } = useLocationsChange()

  const loadingUser = user === undefined

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth]);


  useEffect(() => {
    if (Configs && location) {
      if (DiaAtual != Configs.Date) {
        const data = {
          locations: location,
          Date: DiaAtual
        }

        updateConfigs(Configs[0].id, data)
      }
    }

  }, [Configs, location])



  if (loadingUser) {
    return <p>Carregando...</p>
  }

  if (rewards) {
    return <Rewards rewards={rewards} setRewards={setRewards} user={user} />
  }


  return (
    <div className='App'>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <div className='container'>
            <ListProvider value={{ List }}>
              <Routes>
                <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
                <Route path='/register' element={!user ? <Register setRewards={setRewards} /> : <Navigate to='/' />} />
                <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
                <Route path='/pokedex' element={user ? <Pokedex /> : <Navigate to='/login' />} />
                <Route path='/How' element={user ? <How setRewards={setRewards} /> : <Navigate to='/login' />} />
                <Route path='/profile' element={user ? <Profile /> : <Navigate to='/login' />} />
                <Route path='/location/:id' element={user ? <Location /> : <Navigate to='/login' />} />
              </Routes>
            </ListProvider>
          </div>
        </BrowserRouter>
      </AuthProvider>

    </div >
  )
}

export default App
