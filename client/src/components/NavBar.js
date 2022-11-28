import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({setUser}) => {

    // log out
    const handleLogOut = () => {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(r => {
            if (r.ok) {
                setUser(null)
            }
        })
    }





  return (
    <div>NavBar
        <button onClick={handleLogOut}>Log Out</button>
        <Link to='/profile'>Edit Profile</Link>
        <Link to='/tweets'>All Tweets</Link>
    </div>
  )
}

export default NavBar