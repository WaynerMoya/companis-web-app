import axios from 'axios'

export const companyApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})