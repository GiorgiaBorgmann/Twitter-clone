import React, { useState } from 'react'
import Form from './Form.js'
import Tweet from './Tweet.js'
import Profile from './Profile.js'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

function Main() {
    const [inputText, setInputText] = useState('');
    const [tweetList, setTweets] = useState([]);
    const [userName, setProfile] = useState('')

    return (
        <Router>
            <div className='navbar'>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
                <div>
                    <Switch>
                        <Route exact path="/home">
                            <Form userName={userName} inputText={inputText} tweetList={tweetList} setTweets={setTweets} setInputText={setInputText} />
                            {tweetList.map((tweet, index) => (
                                < Tweet key={index} tweet={tweet} />))}
                        </Route>
                        <Route exact path="/profile">
                            <Profile userName={userName} setProfile={setProfile} />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default Main