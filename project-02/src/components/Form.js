import React, { useState, useEffect } from 'react';

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
            showLoader()
            const tweetList = await fetch(URL);
            const data = await tweetList.json();
            setTweets(data.tweets);
            console.log(data)
            if (data) {
                hideLoader()
            }
        };
        getTweets();
    }, []);

    const addTweet = (text) => {
        const newTweets = {}
        newTweets.content = text;
        newTweets.date = new Date().toISOString()
        newTweets.userName = 'Giorgia'
        dataRecieve(newTweets)
        showLoader()
        setTimeout(() => {
            setTweets([newTweets, ...tweetList])
            hideLoader()
        }, 2000)
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
        <div>
            <textarea value={inputText} onChange={e => handleTweetToLong(e)} placeholder="What you have in mind..."></textarea>
            {!loading ? <button disabled={tweetTooLong} onClick={submitTweetHandler}>Tweet</button> : null}

            { loader}
        </div>

    )
}
export default Form