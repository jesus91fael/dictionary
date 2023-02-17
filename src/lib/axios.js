import axios from "axios"

const URL = "https://dicio-api-ten.vercel.app/v2/"

export const api = axios.create({
  baseURL: `${URL}`
})
