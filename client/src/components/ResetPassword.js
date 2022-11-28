import React,{ useState } from 'react'

const ResetPassword = ( { setUser }) => {

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])

    const handleReset = (e) => {
        e.preventDefault()
        fetch('/reset_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
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
    <div>
        <form onSubmit={handleReset}>
            <h1>Reset Password</h1>
            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            {
                errors.map(error => <p key={error}>{error}</p>)
            }
            <br />
            <br />
            <input type="submit" value="Reset Password"/>
        </form>
    </div>
  )
}

export default ResetPassword