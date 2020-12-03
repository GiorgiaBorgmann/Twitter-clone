import React, { useState } from 'react'
import Form from './Form.js'
import Tweet from './Tweet.js'
import Profile from './Profile.js'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { TweetListContext, UserContext } from '../contexts/TweetListContext'

function Main() {
    const [inputText, setInputText] = useState('');
    const [tweetList, setTweets] = useState([])
    const [userName, setUserName] = useState('')

    return (
        <Router>
            <div >
                <ul className='nav-bar-container'>
                    <li>
                        <Link className="link" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="link" to="/profile">Profile</Link>
                    </li>
                </ul>
                <div>
                    <Switch>
                        <TweetListContext.Provider value={{ tweetList, setTweets }}>
                            <UserContext.Provider value={{ userName, setUserName }}>
                            <Route exact path="/">
                                <Form userName={userName} inputText={inputText} tweetList={tweetList} setTweets={setTweets} setInputText={setInputText} />
                                {tweetList.map((tweet, index) => (
                                    < Tweet key={index} tweet={tweet} />))}
                            </Route>
                            <Route exact path="/profile">
                                    <Profile userName={userName} setUserName={setUserName} />
                            </Route>
                            </UserContext.Provider>
                        </TweetListContext.Provider>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default Main