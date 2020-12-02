import React from 'react';

function Profile({ setProfile, userName }) {

    const handleUserProfile = (event) => {
        setProfile(event.target.value)
    }
    const submitProfileHandler = (event) => {
        event.preventDefault()
        setProfile(userName)
    }
    return (
        <div>
            <input type="text" onChange={event => handleUserProfile(event)}></input>
            <button onClick={submitProfileHandler}>Submit</button>
        </div>
    )

}

export default Profile