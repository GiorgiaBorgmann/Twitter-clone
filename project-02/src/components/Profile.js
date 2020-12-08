import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/TweetListContext'
import 'firebase/firestore'
import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/auth';

function Profile({ user }) {
    const { userName, setUserName } = useContext(UserContext)
    const [inputValue, setInputValue] = useState("")
    const handleUserProfile = (event) => {
        setUserName(event.target.value)
        setInputValue(event.target.value)
    }
    const submitProfileHandler = (event) => {
        event.preventDefault()
        setUserName(userName)
        setInputValue("")
    }
    const [file, setFile] = useState([])
    const choseFile = async (event) => {
        await setFile(event.target.files[0])
    }
    const submitProfilePicture = async (event) => {
        event.preventDefault()
        console.log(user)
        firebase.storage().ref('users/' + user.uid + '/profile.jpg').put(file).then(() => {
            console.log('ok1')
        })
            .catch((e) => {
                console.log(e)
            })
        firebase.auth().onAuthStateChanged(user => {
            firebase.storage().ref('users/' + user.uid + '/profile.jpg').getDownloadURL().then(img => {
                console.log(img)
                user.updateProfile({
                    photoURL: img
                })
            })
        })

    }

    return (
        <form className="profile-container">
            <div className="container-input-profile">
                <h1>Profile</h1>
                <label>User Name</label>
                <input type="text" value={inputValue} onChange={event => handleUserProfile(event)}></input>
            </div>
            <div className="input-button-container">
                <button onClick={submitProfileHandler}>Submit</button>
            </div>
            <div>
                <input type="file" onChange={(event) => choseFile(event)}></input>
            </div>
            <button onClick={(event) => submitProfilePicture(event)}>Change profile photo</button>
        </form>
    )

}

export default Profile