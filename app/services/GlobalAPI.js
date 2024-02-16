import axios from 'axios';

const BASE = "https://idea-x-api.vercel.app/api"

const getResponse = (name,userMsg)=>axios.get(`${BASE}/idea/talkmentor?name=${name}&usertext=${userMsg}`)

export default getResponse