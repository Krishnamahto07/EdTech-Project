import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import React, {  useState } from 'react'
import {toast} from "react-hot-toast"
import { setSignupData } from '../../redux/slices/authSlice';
import { sendOtp } from '../../services/operations/authApi';
// import Loading from '../common/Loading';


const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const options = ["Student" , "Instructor"];
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType:""
    })

    const { firstName, lastName, email, password, confirmPassword ,accountType} = formData

    function handleOnChange(e) {
      // console.log("Calling handleOnChange");
      setFormData( (prevData) =>({ ...prevData , [e.target.name] : e.target.value })                        
    )}

    // function optionChangeHandler(e) {
    //   setFormData((prevData) => ({[e.target.name] : e.target.value}))
    // }

    const submitHandler = (e) =>{
        e.preventDefault();        
        console.log("Form Data = ",formData);   
        if(password !== confirmPassword) {toast.error("Password Mismatch !!"); return ;}
        dispatch(setSignupData(formData))
        dispatch(sendOtp(formData.email,navigate))
        // setFormData(null)
    }
  return (
    
      <div className="flex flex-col items-center justify-center mt-10 md:w-full w-2/3 mx-auto">
        <h1 className='text-3xl font-semibold text-richblack-5'>Sign up </h1>
        <form onSubmit={submitHandler}     className='flex flex-col gap-3 lg:w-1/2 w-full'>
            <div className='flex gap-4  w-full'>
              <input value={firstName} required  id='firstName'    name="firstName" onChange={handleOnChange}  className='w-1/2 rounded px-3 py-2 hover:bg-richblack-600 ' type='text'  placeholder='Enter First Name ...'/>
              <input value={lastName}   required     name="lastName" onChange={handleOnChange}  className='w-1/2 rounded px-3 py-2 hover:bg-richblack-600 ' type='text'  placeholder='Enter Last Name ...'/>
            </div>
            <input value={email}     required      name="email" onChange={handleOnChange}  className='rounded px-3 py-2 hover:bg-richblack-600 ' type='email' placeholder='Enter Email ...' />
            
            <div className='flex gap-4 w-full'>
              <input value={password}   required     name="password" onChange={handleOnChange}  className=' w-1/2 rounded px-3 py-2 hover:bg-richblack-600 ' type='password' placeholder='Enter Password ...' />
              <input value={confirmPassword} required name="confirmPassword" onChange={handleOnChange}  className='w-1/2 rounded px-3 py-2 hover:bg-richblack-600 ' type='password' placeholder='Enter Confirm Password ...' />
            </div>
            {/* <label htmlFor='select' className=" text-white ">Select Account Type </label>
            
            <select value={accountType} id='select'   name="accountType" onChange={handleOnChange}  className='rounded px-3 py-2 hover:bg-richblack-600 ' >
                <option>Select Value</option>
                {
                  options.map((option,index) => (
                    <option>{option}</option>
                  ))
                }
            </select> */}
            <select onChange={handleOnChange} required name='accountType'>
                <option>Please choose one option</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
            {/* <input value={accountType} name="accountType" onChange={handleOnChange}  className='rounded px-3 py-2 hover:bg-richblack-600 ' type='text' placeholder='Enter Account Password ...' /> */}

            <button type='submit' className='bg-richblack-500 px-2 py-2'>Submit</button>
        </form>
        {/* <Loading/> */}
      </div>
    
  )
}

export default SignupForm
