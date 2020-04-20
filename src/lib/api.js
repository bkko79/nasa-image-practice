import axios from 'axios'

export function getAPOD(date =''){
  return axios.get(`https://api.nasa.gov/planetary/apod?api_key=K6QYE7pZokLDEFSstdTirTczntxO8U5OySrDAnVr&date=${date}`)
}