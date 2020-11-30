import React, { useState } from 'react';
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
    const submitTweetHandler = (event) => {
        event.preventDefault()
        setTweets([{ text: inputText, date: new Date(), id: Math.random() }, ...tweetList])
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