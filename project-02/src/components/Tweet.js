import React from 'react';

const TweetList = ({ tweet }) => {
    return (
        <div >
            <ul className="container-tweets">
                <li className="li-tweet">
                    <img className="image-container" src={tweet.photoURL || '../default-user-image.webp'}></img>
                    <div className="text-container">
                        <div className="user-name-date-container">
                            <div className="color-text">{tweet.userName}</div>
                            <div className="color-text">{tweet.date}</div> 
                        </div>               
                        <div className="tweet">{tweet.content}</div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
export default TweetList