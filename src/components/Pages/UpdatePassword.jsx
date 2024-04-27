import { Spinner } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { ImEye ,ImEyeBlocked } from "react-icons/im";
import { Link } from 'react-router-dom';
import { resetPassword } from '../../services/operations/authApi';
import Button from '../Homepages/Button';


const UpdatePassword = () => {
    const dispatch = useDispatch();
    // for Location i.e. url
    const location = useLocation();

    const {loading} = useSelector((state) => state.auth)


    const [showPass , setShowPass] = useState(false)
    const [cnfmPass , setCnfmPass] = useState(false)
    const [formData ,setFormData]=useState({
        password:"",
        confirmPassword:"",
    })
    const {password , confirmPassword} = formData;

    const handleOnChange = (e) =>{
        setFormData((pre) => (
            {
                ...pre , [e.target.name ] : e.target.value,
            }
        ))
    }
    const handleOnSubmit = (e) =>{
        e.preventDefault();

        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token))
        
    }
  return (
    <div className='text-richblack-25 w-full'>
        {
            loading ? (<div className='text-white bg-richblack-600'><Spinner /></div>) : 
            (
                <div className='flex justify-center items-center flex-col gap-2 my-4 md:w-2/3 md:mx-auto mx-5 border border-white'>
                    <h1 className='text-3xl  uppercase font-semibold text-white'>Create new Pasword</h1>
                    <p className=' text-center'>Almost done . Enter your new password and you're all set ..</p>
        
                    <form onSubmit={handleOnSubmit}
                    className='flex flex-col justify-center items-center gap-2 md:w-2/3 w-full'>
                        <label className='relative md:w-2/3 w-full  border border-white'>
                            <p>New Password</p>
                            <input
                            className='w-full px-3 py-2 rounded  text-richblack-700 font-semibold'
                            required
                            type={showPass ? "text" : "password"}
                            name='password'
                            onChange={handleOnChange}
                            value={password}
                            placeholder='Enter new Password ...'
                            />
                            <span className='text-richblack-700 right-2 bottom-[6px] absolute ' onClick={()=>{setShowPass(!showPass)}}>
                                {
                                    showPass ? (<ImEye fontSize={24} />):(<ImEyeBlocked fontSize={24} />)
                                }
                            </span>
                        </label>
                        <label className='md:w-2/3  w-full  relative'>
                            <p>Confirm Password</p>
                            <input
                            className='w-full px-3 py-2 rounded  text-richblack-700 font-semibold'
                            required
                            type={cnfmPass ? "text" : "password"}
                            name='confirmPassword'
                            onChange={handleOnChange}
                            value={confirmPassword}
                            placeholder='Enter confirm Password ...'
                            />
                            <span className='text-richblack-700 right-2 bottom-[6px] absolute ' onClick={()=>setCnfmPass(!cnfmPass)}>
                                {
                                    cnfmPass ? (<ImEye fontSize={24} />):(<ImEyeBlocked fontSize={24} />)
                                }
                            </span>
                        </label>
                        <div className='flex gap-4'>
                            <button className='text-white px-3 py-2 bg-richblack-600 rounded' type='submit'>Reset Password</button>
                            {/* <button type='submit'><Button active={true}>Reset Password</Button></button> */}
                            <Button active={false} link={"/login"}>Back to login</Button>
                        </div>
                        {/* <div className='flex  justify-center items-center gap-3'>
                            <button type='submit'><Button >Reset Password</Button></button> */}
                            {/* <button className='bg-yellow-200 px-3 py-2  font-semibold text-white rounded' type='submit'>Reset Password</button> */}
                            {/* <div className="mt-6 flex items-center justify-between">
                                <Link to = "/login"> 
                                    <p className="flex items-center gap-x-2 text-richblack-5">  Back To Login </p>  
                                </Link>
                            </div>
                        </div> */}
                    </form>
                </div>
            )
            // <BiArrowBack />
        
        }
    </div>
  )
}

export default UpdatePassword
