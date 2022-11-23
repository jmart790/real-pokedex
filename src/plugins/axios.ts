import axios from 'axios'
import type { App } from 'vue'

interface AxiosOptions {
    baseUrl?: string
}

export default {
    install: (app: App, options: AxiosOptions) => {
        app.config.globalProperties.$axios = axios.create({
            baseURL: 'https://pokeapi.co/api/v2/'
        })
    }
}