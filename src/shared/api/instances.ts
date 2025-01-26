import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'content-type': 'application/json'
  }
})

const GESHINAPI = 'https://genshin.jmp.blue'

const cache = new Map();

const getPosts = async (urlValue: string) => {
  const cacheKey = GESHINAPI + urlValue;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const response = await axios({
    url: cacheKey,
    method: 'GET'
  });

  cache.set(cacheKey, response.data);
  return response.data;
};

export { getPosts };
