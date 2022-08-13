import { defineStore } from "pinia"
import api from '@/services/api'
import CONSTANTS from '@/services/constants'
import router from "@/router"
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const useAuthStore = defineStore('auth-store', {
    state: () => ({
        username: '',
        isAdmin: false,
        error: null,
        isCredsAuthenticated: false
    }),
    getters: {
        isAuthenticated: (state) => {
            return state.isCredsAuthenticated || !!cookies.get('access-token')
        } 
    },
    actions: {
        async login(credentials) {
            await api.post('/api/v1/auth/login', credentials)
            .then(r => r.data)
            .then(r => {
                const { accessToken } = r
                if (accessToken) {
                    const cookieConfig = {
                        path: '/',
                        sameSite: 'strict',
                        expires: new Date(Date.now() + CONSTANTS.sessionTimeout)
                    }
                    cookies.set('access-token', accessToken, cookieConfig)
                    router.push('/')
                    this.isCredsAuthenticated = true
                }
                
            })
            .catch(e => {
                console.log(e)
                this.error = e
            })
        },

        async signup(data) {
            await api.post('/api/v1/auth/signup', data)
            .then(r => {
                if(r.data) {
                    router.push('/login')
                }
            })
            .catch(e => {
                console.log(e)
                this.error = e
            })

        }
    }
})