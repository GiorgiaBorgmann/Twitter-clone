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
        firebase.auth().onAuthStateChanged(user => {
            user.updateProfile({
                displayName: userName
            })
        })
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
            <div className="border-profile">
            <div className="container-input-profile">
                <h1>Profile</h1>
                    <label>Change user name</label>
                <input type="text" value={inputValue} onChange={event => handleUserProfile(event)}></input>
            </div>
            <div className="input-button-container">
                <button onClick={submitProfileHandler}>Submit</button>
            </div>
                <h4>Upload profile picture</h4>
                <div className="flex-file">
                    <div className='upload'>
                        <div className="upload-text">Chose File</div>
                        <input name="upload" type="file" onChange={(event) => choseFile(event)} />
                    </div>
                    <button className='submit-file' onClick={(event) => submitProfilePicture(event)}>Change profile photo</button>
                </div>
            </div>
        </form>
    )

}

export default Profile