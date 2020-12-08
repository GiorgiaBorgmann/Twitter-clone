import React, { useState } from 'react'
import Form from './Form.js'
import Profile from './Profile.js'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { TweetListContext, UserContext } from '../contexts/TweetListContext'
import { auth } from './Firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import Tweet from './Tweet.js'
import { Register, SignOut } from './RegisterUser'


 function Main() {
     const [inputText, setInputText] = useState('');
     const [tweetList, setTweets] = useState([])
     const [user] = useAuthState(auth);
     console.log(user)
     const [userName, setUserName] = useState('')

     if (user) {
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
                    <li>
                        <SignOut />
                    </li>
                </ul>
                <div>
                    <Switch>
                        <TweetListContext.Provider value={{ tweetList, setTweets }}>
                            <UserContext.Provider value={{ userName, setUserName }}>
                            <Route exact path="/">
                                    <Form auth={auth} user={user} userName={userName} inputText={inputText} tweetList={tweetList} setTweets={setTweets} setInputText={setInputText} />
                                    {tweetList.map((tweet, index) => (
                                    < Tweet key={index} tweet={tweet} />))}
                            </Route>
                            <Route exact path="/profile">
                                    <Profile userName={userName} user={user} setUserName={setUserName} />
                            </Route>
                            </UserContext.Provider>
                        </TweetListContext.Provider>
                    </Switch>
                </div>
            </div>
             </Router>)

     } else {
         return (
             <Router>
                 <Route path="/">
                     <Register user={{ user }} />
                 </Route>
             </Router>
         )
     }              
}
export default Main;




