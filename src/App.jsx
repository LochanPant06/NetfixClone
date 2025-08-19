import React from 'react'
import Home from './Components/Home'
import Sidenav from './Components/partials/Sidenav'
import { Route,Routes } from 'react-router-dom'
function App() {
  return (
    <div className=' bg-[#1F1E24] flex '>

<Routes>
  <Route path="/" element ={<Home/>} />
</Routes>

    </div>
  )
}

export default App