import axios from 'axios'
import { ENV } from '@configs/env'

export const http = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
  return config
})

http.interceptors.response.use(
  (res) => {
    const paginate = (res.data as any)?.paginate
    if (paginate) {
      console.log(`[API] ${res.config.url} → paginate:`, JSON.stringify(paginate))
    } else {
      console.log(`[API] ${res.config.url} → ok (${Array.isArray((res.data as any)?.items) ? (res.data as any).items.length + ' items' : typeof res.data})`)
    }
    return res
  },
  (err) => {
    console.error('[API Error]', err?.response?.status, err?.config?.url, err?.message)
    return Promise.reject(err)
  }
)
