import React, { useState, useEffect, useContext } from 'react';
import { TweetListContext } from '../contexts/TweetListContext'
import firebase from 'firebase/app';

function Form({ user, userName, setInputText, inputText }) {
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
    const alert = () => {
        if (tweetTooLong) {
            return (<div className="message">The tweet can not have more then 140 char</div>)
        }
    }
   
    useEffect(() => {
        let newArray = []
        const getTweets = async () => {
            firebase.firestore().collection('tweet').orderBy('date', 'desc').onSnapshot((singleTweet) => {
                singleTweet.forEach((element) => {
                    newArray.push(element.data())
                })
            })
            showLoader()
            const finalArr = newArray
            setTweets(finalArr)
            if (finalArr) {
                hideLoader()
            }
        }
        getTweets();
    }, [])

    const addTweet = (text) => {
        const newTweets = {}
        newTweets.content = text;
        newTweets.date = new Date().toISOString()
        newTweets.userName = user.displayName
        newTweets.photoURL = user.photoURL
        setTweets([newTweets, ...tweetList])
        firebase.firestore().collection('tweet').add(newTweets)

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
                {alert()}
                {!loading ? <button className="btn-form" disabled={tweetTooLong} onClick={submitTweetHandler}>Tweet</button> : null}
            </div>
            </div>  
         )
}
export default Form