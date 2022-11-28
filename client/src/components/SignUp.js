import React,{ useState } from 'react'

const SignUp = ({ setUser }) => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCofirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const handleSignUp = (e) => {
        e.preventDefault()
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                username,
                password,
                password_confirmation: passwordCofirmation
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
    <form onSubmit={handleSignUp}>
        <h1>Sign Up</h1>
        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/> 
        <br />
        <br />
        <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <br />
        <br />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <p>Password must include a number, an uppercase letter and a special character </p>
        <input type="password" placeholder="password confirmation" value={passwordCofirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
        {
            errors.map(error => <p key={error}>{error}</p>)
        }
        <br />
        <br />
        <input type="submit" value="Sign Up"/>
    </form>

    </>
  )
}

export default SignUp