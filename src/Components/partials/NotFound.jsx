import React from 'react'
import notfound from '/404.gif'
function NotFound() {
  return (
     <div className='w-screen h-screen flex justify-center items-center bg-black'>
      <img className='h-[70%] object-cover ' src={notfound} alt="" />
    </div>
  )
}

export default NotFound
