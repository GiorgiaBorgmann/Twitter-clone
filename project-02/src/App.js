import React, { useState, useEffect } from 'react'
import Form from './components/Form.js'
import Tweet from './components/Tweet.js'

function App() {
  const [inputText, setInputText] = useState('');
  const [tweetList, setTweets] = useState([]);

  useEffect(() => {
    const tweetList = JSON.parse(localStorage.getItem("tweetList"));
    if (tweetList) {
      setTweets(tweetList);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tweetList", JSON.stringify(tweetList));
  }, [tweetList]);


  return (
    <div >
      <Form inputText={inputText} tweetList={tweetList} setTweets={setTweets} setInputText={setInputText} />
      {tweetList.map((tweet) => (
        < Tweet key={tweet.id} tweet={tweet} />))}
    </div>
  );
}

export default App;
