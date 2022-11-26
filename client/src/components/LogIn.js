import React, { useState} from 'react'
import SignUp from './SignUp'

const LogIn = ({ setUser }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const [showLogIn, setShowLogIn] = useState(true)

    const handleLogIn = (e) => {
        e.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(r => {
            if (r.ok) {
                r.json().then(user => setUser(user))
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        })
    }

  return (
    <>
    {
        showLogIn ?
        <form onSubmit={handleLogIn}>
            <h1>Log In</h1>
            <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <br />
            <br />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {
                errors.map(error => <p key={error}>{error}</p>)
            }
            <br />
            <br />
            <input type="submit" value="Log In"/>
            {
                
            }
            <p>Don't have an account &nbsp;
                    <button onClick={() => setShowLogIn(false)}>Sign Up</button>
            </p>
            
        </form>
        :
        <>
        <SignUp setUser={setUser}/>
        <p>Already have an account &nbsp;
                    <button onClick={() => setShowLogIn(true)}>Log In</button>
            </p>
        </>
    }
    </>
  )
}

export default LogIn