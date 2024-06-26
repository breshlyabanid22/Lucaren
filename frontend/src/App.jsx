import React, { createContext } from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import  Navbar from './Navbar'
import { client }  from './Url'
import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import Cars from './Cars';
import About from './About';
import ProfileSettings from './ProfileSettings';
import CarListing from './CarListing';
import ManageProfile from './ManageProfile';
import Contact from './Contact';
import SingleCarPage from './SingleCarPage';
import RentalBooking from './RentalBooking';
import MyBooking from './MyBooking';

export const UserContext = createContext();

function App() {

  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    client.get("/user")
    .then((res) => {
      setCurrentUser(true);
    })
    .catch((error) => {
      setCurrentUser(false);
    });
  }, []);


  return (
    <div className='h-screen overflow-y-auto bg-black-2'>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <Routes>
          <Route path='/' element={<Navbar/>}>
            <Route index element={<Home/>}/>
            <Route path='/signup' element={<Registration/>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/cars' element={<Cars/>}/>
            <Route path='/cars/:carId' element={<SingleCarPage/>}/>
            <Route path='/rental-booking/:carId' element={<RentalBooking/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/account-settings' element={<ProfileSettings/>}>
              <Route index element={<ManageProfile/>}/>
              <Route path='/account-settings/car-listing' element={<CarListing/>}/>
              <Route path='/account-settings/my-booking' element={<MyBooking/>} />
            </Route>
          </Route>
        </Routes> 
      </UserContext.Provider>
    </div>
  );
}

export default App;
