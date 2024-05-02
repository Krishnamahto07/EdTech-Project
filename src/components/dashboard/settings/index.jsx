import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Setting = () => {
  return (
    <div className='text-richblack-200'>
      <h1 className='text-center text-3xl'>Edit Profile</h1>
      <ChangeProfilePicture/>
      <EditProfile/>
      <UpdatePassword/>
      <DeleteAccount/>
    </div>
  )
}

export default Setting
