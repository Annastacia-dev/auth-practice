import React from 'react'

const Home = ( { user }) => {
  return (
    <div>
      <img className='avatar' src={user.avatar_url || user.picture} alt="" />
        <h4>{user.name}</h4>
        <p>@{user.username || user.given_name}</p>
        <p>{user.bio}</p>
        <h3>My Tweets</h3>
        {
          user.tweets ?
          user.tweets.map(tweet => <p key={tweet.id}>{tweet.tweet}</p>)
          :
          null
        }

    </div>
  )
}

export default Home