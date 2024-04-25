import React from 'react'

const Logout = () => {
    function logoutHandler(){

    }
  return (
    <div className='w-full bg-richblack-900 text-richblack-5 flex justify-center items-center flex-col my-14 gap-5'>
        <h1>Are you sure want to Logout</h1>
        <button onClick={logoutHandler()} className='px-2 py-1 bg-richblack-800 hover:bg-richblack-700 font-semibold'>
            Yes
        </button>
    </div>
  )
}

export default Logout
