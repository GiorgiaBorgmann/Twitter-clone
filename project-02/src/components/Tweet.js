import React from 'react';

const TweetList = ({ tweet }) => {
    return (
        <div>
            <ul>
                <li>
                    <div>{tweet.date.toString()}</div>
                    <div>{tweet.text}</div>
                    <div>{tweet.user}</div>
                </li>
            </ul>
        </div>
    )
}
export default TweetList