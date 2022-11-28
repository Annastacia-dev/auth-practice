import React from 'react'

const Home = ( { user }) => {
  return (
    <div>
      <img className='avatar' src={user.avatar_url} alt="" />
        <h4>{user.name}</h4>
        <p>@{user.username}</p>
        <p>{user.bio}</p>
        {
          user.tweets ?
          user.tweets.map(tweet => <p key={tweet.id}>{tweet.content}</p>)
          :
          null
        }

    </div>
  )
}

export default Home