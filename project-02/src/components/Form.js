import React, { useState, useEffect, useContext } from 'react';
import { TweetListContext } from '../contexts/TweetListContext'


function Form({ userName, setInputText, inputText }) {
    const { setTweets, tweetList } = useContext(TweetListContext)
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
    const messages = () => {
        if (tweetTooLong) {
            return (<div className="message">The tweet can not have more then 140 char</div>)
        }
    }
    const URL = "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet"

    const dataRecieve = async (newTweets) => {
        showLoader()
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
        hideLoader()
        console.log(data)
    }
    useEffect(() => {
        const interval = setInterval(() => {
            const getTweets = async () => {
                const tweetList = await fetch(URL);
                const data = await tweetList.json();
                setTweets(data.tweets);
                console.log(data)
            };
            getTweets()
        }, 1000)
    }, []);

    const addTweet = (text) => {
        const newTweets = {}
        newTweets.content = text;
        newTweets.date = new Date().toISOString()
        newTweets.userName = userName || "User Name"
        dataRecieve(newTweets)
        setTweets([newTweets, ...tweetList])
    }
    const submitTweetHandler = (event) => {
        event.preventDefault()
        addTweet(inputText)
        setInputText('')
    }
    const PageLoader = () => {
        return (
            <div>Loading...</div>
        )
    }
    const [loading, setLoading] = useState(false)
    const usePageLoader = () => {
        return [
            loading ? PageLoader() : null,
            () => setLoading(true),
            () => setLoading(false)]
    }
    const [loader, showLoader, hideLoader] = usePageLoader()
    return (
        <div className="container-form">
            <textarea rows={6} cols={60} value={inputText} onChange={event => handleTweetToLong(event)} placeholder="What you have in mind..."></textarea>
            { loader}
            <div className="btn-container-form">
                {messages()}
                {!loading ? <button className="btn-form" disabled={tweetTooLong} onClick={submitTweetHandler}>Tweet</button> : null}
            </div>

        </div>
    )
}
export default Form