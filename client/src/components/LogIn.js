import React, { useState, useEffect } from 'react'
import SignUp from './SignUp'
import jwt_decode from 'jwt-decode'




const LogIn = ({ setUser }) => {

    function handleCallbackResponse(response) {
        console.log(response.credential)
        if (response.credential) {
            var id_token = response.credential;
            var user = jwt_decode(id_token)
            // assign session id to user
            user.id = user.sub
            setUser(user)
            

        } else {
            alert('No credential')
        }
    }


    useEffect(() => {
        // global google

        // eslint-disable-next-line no-undef
        google.accounts.id.initialize({
            client_id: "201862110852-a0eppovpnglc56jq5lp7pf00947opb4i.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        // eslint-disable-next-line no-undef
        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            {
                theme: 'outline',
                size: 'large',
            }
        )



    }, [])






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
            <div id="signInDiv">
            </div>
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