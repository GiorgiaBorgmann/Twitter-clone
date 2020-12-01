import React from 'react';

const TweetList = ({ tweet }) => {
    return (
        <div>
            <ul>
                <li>
                    <div>{tweet.date}</div>
                    <div>{tweet.content}</div>
                    <div>{tweet.userName}</div>
                </li>
            </ul>
        </div>
    )
}
export default TweetList