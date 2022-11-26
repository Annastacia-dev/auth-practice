import React from 'react'

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
    </div>
  )
}

export default NavBar