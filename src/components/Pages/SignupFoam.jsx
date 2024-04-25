import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import React, {  useState } from 'react'
import {toast} from "react-hot-toast"
import { setSignupData } from '../../redux/slices/authSlice';
import { sendOtp } from '../../services/operations/authApi';


const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

    const { firstName, lastName, email, password, confirmPassword ,accountType} = formData

    function handleOnChange(e) {
      // console.log("Calling handleOnChange");
      setFormData( (prevData) =>({ ...prevData , [e.target.name] : e.target.value })                        
    )}

    const submitHandler = (e) =>{
        e.preventDefault();        
        console.log("Form Data = ",formData);   
        if(password !== confirmPassword) {toast.error("Password Mismatch !!"); return ;}
        dispatch(setSignupData(formData))
        dispatch(sendOtp(formData.email,navigate))
        // setFormData(null)
    }
  return (
    <div className='w-full'>
      <div className='w-11/12 mx-auto text-richblack-900'>
        <form onSubmit={submitHandler}     className='flex w-2/3 mx-auto my-5 rounded-sm  flex-col gap-4 px-4 py-3 bg-richblack-700'>
            <input value={firstName}       name="firstName" onChange={handleOnChange}  className='rounded px-3 py-2 hover:bg-richblack-600 ' type='text'  placeholder='Enter First Name ...'/>
            <input value={lastName}        name="lastName" onChange={handleOnChange}  className='rounded px-3 py-2 hover:bg-richblack-600 ' type='text'  placeholder='Enter Last Name ...'/>
            <input value={email}           name="email" onChange={handleOnChange}  className='rounded px-3 py-2 hover:bg-richblack-600 ' type='email' placeholder='Enter Email ...' />
            <input value={password}        name="password" onChange={handleOnChange}  className='rounded px-3 py-2 hover:bg-richblack-600 ' type='password' placeholder='Enter Password ...' />
            <input value={confirmPassword} name="confirmPassword" onChange={handleOnChange}  className='rounded px-3 py-2 hover:bg-richblack-600 ' type='password' placeholder='Enter Confirm Password ...' />
            <select value={accountType}    name="accountType" onChange={handleOnChange}  className='rounded px-3 py-2 hover:bg-richblack-600 ' >
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
            </select>
            <button type='submit' className='bg-richblack-500 px-2 py-2'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
