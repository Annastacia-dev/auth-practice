import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Profile = ({user, setUser }) => {

    const navigate = useNavigate()

    const [name, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [bio, setBio] = useState(user.bio)
    const [avatarUrl, setAvatarUrl] = useState(user.avatar_url)
    const [errors, setErrors] = useState([])


    const handleEdit = (e) => {
        e.preventDefault()
        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                username,
                password: user.password_digest,
                email,
                bio,
                avatar_url: avatarUrl
            })
        })
        .then(r => {
            if (r.ok) {
                r.json().then(user => setUser(user)
                )
            } else {
                r.json().then(err => setErrors(err.errors))
            }

            navigate('/')
        })
    }


  return (
    <div>
        <h1>Profile</h1>
            <form onSubmit={handleEdit}>
                <h1>Edit Profile</h1>
                <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <br />
                <br />
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <br />
                <br />
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <br />
                <br />
                <input type="text" placeholder="bio" value={bio} onChange={(e) => setBio(e.target.value)}/>
                <br />
                <br />
                <input type="text" placeholder="avatar url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)}/>
                {
                    errors.map(error => <p key={error}>{error}</p>)
                }
                <br />
                <br />
                <input type="submit" value="Save"/>
                <Link to='/'> Go back </Link>
                

            </form>
    </div>
  )
}

export default Profile