import React from 'react';

const TweetList = ({ tweet }) => {
    return (
        <div >
            <ul className="container-tweets">
                <li className="li-tweet">
                    <div className="user-name-date-container">
                        <div>{tweet.userName}</div>
                    <div>{tweet.date}</div> 
                    </div>               
                    <div className="tweet">{tweet.content}</div>
                </li>
            </ul>
        </div>
    )
}
export default TweetList