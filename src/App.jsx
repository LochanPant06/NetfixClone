import React from 'react'
import Home from './Components/Home'
import Sidenav from './Components/partials/Sidenav'
import { Route,Routes } from 'react-router-dom'
import Trending from './Components/Trending'
function App() {
  return (
    <div className=' bg-[#1F1E24] flex '>

<Routes>
  <Route path="/" element ={<Home/>} />
  <Route path="/trending" element ={<Trending/>} />

</Routes>

    </div>
  )
}

export default App