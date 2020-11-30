import React from 'react';

const TweetList = ({ tweet }) => {
    return (
        <div>
            <ul>
                <li>{tweet.text}</li>
            </ul>
        </div>
    )
}
export default TweetList