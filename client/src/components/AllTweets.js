import React, { useState, useEffect} from 'react'

const AllTweets = () => {

    const [tweets, setTweets] = useState([])

    useEffect(() => {
        fetch('/tweets')
        .then(r => r.json())
        .then(data => setTweets(data))
    }, [])



  return (
    <div>
        {
            tweets.map(tweet => (
 
                <div key={tweet.id}>
                <p>@{tweet.user.username}</p>
                <p>{tweet.tweet}</p>
                </div>
            ))
        }
    </div>
  )
}

export default AllTweets