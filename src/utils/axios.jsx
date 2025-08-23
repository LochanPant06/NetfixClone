import React from 'react'
import axios from 'axios'


const instance = axios.create({
  baseURL : "https://api.themoviedb.org/3/",
  // header api key bhejne ke liye use mai aata hai 
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWFhNDUxYWY5ZjJkYTg0ZGMyODdmNDQ4ZjFhYTlkZiIsIm5iZiI6MTc1NTgwMTgyOS42MTUsInN1YiI6IjY4YTc2OGU1YmM5NzYyYzk3M2E4MWNkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j0WsMeqaI80ZHiHxTzPVB5N7qQbXpKzh9tHhsa5_Q74'
  }
});
export default instance;