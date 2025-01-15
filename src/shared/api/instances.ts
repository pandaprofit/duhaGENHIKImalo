import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'content-type': 'application/json'
  }
})

const GESHINAPI = 'https://genshin.jmp.blue'

export const getPosts = axios({
  url: `${GESHINAPI}/artifacts`,
  method: 'GET',
  params: { offset: 0, limit: 10 }
})
