import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/TweetListContext'

function Profile() {
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
        </form>
    )

}

export default Profile