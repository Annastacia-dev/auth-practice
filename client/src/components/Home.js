import React from 'react'

const Home = ( { user }) => {
  return (
    <div>
        Welcome {user.username}
    </div>
  )
}

export default Home