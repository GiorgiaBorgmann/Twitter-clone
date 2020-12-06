import React, { useState } from 'react'
import Form from './Form.js'
import Profile from './Profile.js'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { TweetListContext, UserContext } from '../contexts/TweetListContext'
import firebase from 'firebase/app';
import { auth } from './Firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import Tweet from './Tweet.js'
function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <div>
            <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}
function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}
 function Main() {
     const [inputText, setInputText] = useState('');
     const [tweetList, setTweets] = useState([])
     const [userName, setUserName] = useState('')     
     const [user] = useAuthState(auth);
     console.log(user)
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
                                    <Profile userName={userName} setUserName={setUserName} />
                            </Route>
                            </UserContext.Provider>
                        </TweetListContext.Provider>
                    </Switch>
                </div>
            </div>
             </Router>)

     } else {
         return (<SignIn />)
     }              
}
export default Main;




