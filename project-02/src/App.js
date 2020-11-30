import React, { useState, useEffect } from 'react'
import Form from './components/Form.js'
import Tweet from './components/Tweet.js'
import axios from 'axios'

function App() {
  const [inputText, setInputText] = useState('');
  const [tweetList, setTweets] = useState([]);

  // useEffect(() => {
  //   const tweetList = JSON.parse(localStorage.getItem("tweetList"));
  //   if (tweetList) {
  //     setTweets(tweetList);
  //   }
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem("tweetList", JSON.stringify(tweetList));
  // }, [tweetList]);
  const FetchTweet = async () => {
    const { data, status } = await axios.get('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet')
    if (status === 200) {
      setTweets(data)
    }
  }
  useEffect(() => {
    FetchTweet()
  }, [])


  return (
    <div >
      <Form inputText={inputText} tweetList={tweetList} setTweets={setTweets} setInputText={setInputText} />
      {tweetList.map((tweet) => (
        < Tweet key={tweet.id} tweet={tweet} />))}
    </div>
  );
}

export default App;
