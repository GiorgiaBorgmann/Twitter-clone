import { auth } from './Firebase';
import 'firebase/firestore'
import { provider } from './Firebase'
import React, { useState } from 'react'
import { Route, BrowserRouter as Router, Switch, Link, useHistory } from 'react-router-dom'




const LogIn = () => {
    const [emailExist, setEmailExist] = useState('')
    const [passwordExist, setPasswordExist] = useState('')
    const history = useHistory()
    const handleEmailExist = event => {
        setEmailExist(event.target.value)
    }
    const handlePasswordExist = event => {
        setPasswordExist(event.target.value)
    }
    const signInWithGoogle = () => {
        auth.signInWithPopup(provider);
    }
    const login = () => {
        auth.signInWithEmailAndPassword(emailExist, passwordExist)
        history.push('/')
    }
    return (
        <div className="container-login">
            <div className='container-border'>
                <h1>LogIn</h1>
                <input className="input-login" onChange={event => handleEmailExist(event)} type="email" placeholder="someone@email.com" />
                <input className="input-login" onChange={event => handlePasswordExist(event)} type="password" placeholder="Enter a password" required />
                <div className="btn-login">
                    <button button onClick={login} type="button" >LogIn</button>
                </div>
                <div className="btn-login">
                    <button onClick={signInWithGoogle}>Sign in with Google </button>
                </div>
                <div>Don't have an account? <Link className="login-link" to="/signup" > Sign Up</Link></div>
            </div>
        </div >
    )
}
const SignUpForm = () => {

    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const handleEmail = event => {
        setEmail(event.target.value)
    }
    const handlePassword = event => {
        setPassword(event.target.value)
    }
    const handleUserName = event => {
        setUserName(event.target.value)

    }
    const signup = (email, password) => {

        auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                return result.user.updateProfile({
                    displayName: userName
                })
            })
        history.push('/')
    }

    return (
        <div className="container-sign-up-form">
            < div className="sing-up-border">
                <h1>Create an Account</h1>
                <input className="input-sign-up-form" onChange={event => handleUserName(event)} type="text" placeholder="user name" />
                <input className="input-sign-up-form" onChange={event => handleEmail(event)} type="email" placeholder="someone@email.com" />
                <input className="input-sign-up-form" onChange={event => handlePassword(event)} type="password" placeholder="Enter a password" required />

                {/* <div>
                <h4>Password Confirmation</h4>
                <input type="password" placeholder="Confirm password" required />
            </div> */}
                <div className="btn-sing-up-border">
                    <button onClick={() => signup(email, password)}>Sign Up</button>
                </div>
            </div>
        </div >
    )
}

export const Register = () => {
    return (
        <Router>

            <Switch>
                <Route exact path="/" >
                    <LogIn />
                </Route>
            </Switch>
            <Switch>
                <Route path="/signup" >
                    <SignUpForm />
                </Route>
            </Switch>
        </Router>
    )
}
export const SignOut = () => {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign out</button>
    )
}