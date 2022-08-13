import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const instance = axios.create({
    baseURL: process.env.API_URL,
    crossDomain: true,
    timeout: 30000,
})

const onPreRequest = (config) => {
    if(config) {
        const isApiUrl = config.url.startsWith(process.env.API_URL)
        const { isAuthenticated } = useAuthStore()

        if (isApiUrl && isAuthenticated) {
            const { headers } = config
            const { common } = headers

            const token = cookies.get('access-token')
            common['Authorization'] = `Bearer ${token}`
            const newHeaders = { ...headers, common}
            
            return {...config, newHeaders}
        }
    }

    return config
}

const onPreRequestError = (error) => {
    // store.dispatch(doIsLoadingDone());
    return Promise.reject(error);
}

instance.interceptors.request.use(onPreRequest, onPreRequestError);
// instance.interceptors.response.use(onResponse, onResponseError);

export default instance