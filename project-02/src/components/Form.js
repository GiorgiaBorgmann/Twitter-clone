import React, { useState, useEffect } from 'react';
import { FetchTweet } from './Api'
function Form({ setInputText, setTweets, tweetList, inputText }) {
    const [tweetTooLong, setTweetTooLong] = useState(false)
    const handleTweetToLong = (event) => {
        setInputText(event.target.value)
        if (inputText.length > 140) {
            setTweetTooLong(true)
        } else {
            setTweetTooLong(false)
            setInputText(event.target.value)
        }
    }

    const URL = "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet"

    const dataRecieve = async (newTweets) => {
        const tweetList = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(newTweets),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (!tweetList.ok) Error("error");
        const data = await tweetList.json();
        console.log(data)
    }
    useEffect(() => {
        const getTweets = async () => {
            const tweetList = await fetch(URL);
            const data = await tweetList.json();
            setTweets(data.tweets);
        };
        getTweets();
    }, []);

    const addTweet = (text) => {
        const newTweets = {}
        newTweets.content = text;
        newTweets.date = new Date().toISOString()
        newTweets.userName = 'Giorgia'
        dataRecieve(newTweets)
        setTweets([newTweets, ...tweetList])
        console.log(tweetList)
    }

    const submitTweetHandler = (event) => {
        event.preventDefault()
        addTweet(inputText)
        setInputText('')
    }
    return (
        <div>
            <textarea value={inputText} onChange={e => handleTweetToLong(e)} placeholder="What you have in mind..."></textarea>
            <button disabled={tweetTooLong} onClick={submitTweetHandler}>Tweet</button>
        </div>
    )
}
export default Form