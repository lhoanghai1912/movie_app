import axios from 'axios'
import { ENV } from '@configs/env'

export const http = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API Error]', err?.response?.status, err?.message)
    return Promise.reject(err)
  }
)
