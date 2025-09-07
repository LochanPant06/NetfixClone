import { configureStore } from '@reduxjs/toolkit'
import Movie from '../Components/Movie'
import movieReducer from './reducers/movieSlice'
import personReducer from './reducers/personSlice'
import tvReducer from './reducers/tvSlice'
export const Store = configureStore({
  reducer: {
    movie:movieReducer,
    person:personReducer,
    tv:tvReducer,
  },
})
export default Store;