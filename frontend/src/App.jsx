import React, { createContext } from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import  Navbar from './sections/Navbar/Navbar'
import { client }  from './Url'
import Home from './sections/Home/Home';
import Login from './Login';
import Registration from './Registration';
import ProfileSettings from './sections/Profile/ProfileSettings';
import CarListing from './sections/Cars/CarListing';
import ManageProfile from './sections/Profile/ManageProfile';
import About from './sections/About/About';
import Contact from './sections/Contact/Contact';
import Cars from './sections/Cars/Cars';

export const UserContext = createContext();

function App() {

  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    client.get("/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);


  return (
    <div className='relative min-h-screen bg-black-2'>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <Routes>
          <Route path='/' element={<Navbar/>}>
            <Route index element={<Home/>}/>
            
            <Route path='/signup' element={<Registration/>}/>
            <Route path='/login' element={<Login />}/>

            <Route path='/cars' element={<Cars/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>



            <Route path='/account-settings' element={<ProfileSettings/>}>
              <Route index element={<ManageProfile/>}/>

              <Route path='/account-settings/car-listing' element={<CarListing/>}/>

            </Route>
          </Route>
        </Routes> 
      </UserContext.Provider>
    </div>
  );
}

export default App;
