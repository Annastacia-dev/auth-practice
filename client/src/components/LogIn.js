import React, { useState} from 'react'
import SignUp from './SignUp'




const LogIn = ({ setUser }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const [showLogIn, setShowLogIn] = useState(true)

    const handleGoogleLogIn = (e) => {
        e.preventDefault()
        fetch('/auth/google_oauth2',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
    })
    }






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
                r.json().then(user => console.log(user))
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        })
    }

  return (
    <>
    {
        showLogIn ?
        <>
        <form onSubmit={handleLogIn}>
            <h1>Log In</h1>
            <input 
            type="text" 
            id='username'
            placeholder="username or email" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            />
            <br />
            <br />
            <input 
            type="password" 
            id='password'
            placeholder="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            />
            
            
            {
                errors.map(error => <p key={error}>{error}</p>)
            }
            <br />
            <br />
            <input type="submit" value="Log In"/>
            <br />
            <p>Don't have an account &nbsp;
                    <button onClick={() => setShowLogIn(false)}>Sign Up</button>
            </p>
            
        </form>
            <button
            onClick={handleGoogleLogIn}
            >
                <img src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png" alt="login in with google" />
            </button>
        </>
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