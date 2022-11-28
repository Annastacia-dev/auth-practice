import React, { useEffect, useState } from 'react'
import  { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import LogIn from './components/LogIn'
import Home from './components/Home'
import Profile from './components/Profile'
import AllTweets from './components/AllTweets'


function App() {

  const [user, setUser] = useState(null)

  useEffect(()=> {
      // auto login
      fetch('/me')
      .then(r => {
          if (r.ok) {
              r.json().then(user => setUser(user))
          } })     
},[])

if (!user) return <LogIn setUser={setUser}/>

  return (
    <>
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser}/>}/>
        <Route path="/profile" element={<Profile user={user} setUser={setUser}/>}/>
        <Route path="/tweets" element={<AllTweets user={user} setUser={setUser}/>}/>
      </Routes>
    </>
  );
}

export default App;
