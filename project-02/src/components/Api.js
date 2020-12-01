import axios from 'axios'
const url = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/'
export function FetchTweet() {
    return axios.get(`${url}/tweet`)
}

export function CreateTweet(newTweet) {
    return axios.post(`${url}tweet`, newTweet)
}
