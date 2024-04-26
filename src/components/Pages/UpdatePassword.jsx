import { Spinner } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { ImEye ,ImEyeBlocked } from "react-icons/im";
import { Link } from 'react-router-dom';
import { resetPassword } from '../../services/operations/authApi';


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
    <div className='text-richblack-25 '>
        {
            loading ? (<Spinner />) : 
            (
                <div className='flex justify-center items-center flex-col gap-5'>
                    <h1>Create new Pasword</h1>
                    <p>Almost done . Enter your new password and you're all set ..</p>
        
                    <form onSubmit={handleOnSubmit}>
                        <label>
                            <p>New Password</p>
                            <input
                            className='px-3 py-2 rounded  text-richblack-700 font-semibold'
                            required
                            type={showPass ? "text" : "password"}
                            name='password'
                            onChange={handleOnChange}
                            value={password}
                            placeholder='Enter new Password ...'
                            />
                            <span onClick={()=>{setShowPass(!showPass)}}>
                                {
                                    showPass ? (<ImEye fontSize={24} />):(<ImEyeBlocked fontSize={24} />)
                                }
                            </span>
                        </label>
                        <label>
                            <p>Confirm Password</p>
                            <input
                            className='px-3 py-2 rounded  text-richblack-700 font-semibold'
                            required
                            type={cnfmPass ? "text" : "password"}
                            name='confirmPassword'
                            onChange={handleOnChange}
                            value={confirmPassword}
                            placeholder='Enter confirm Password ...'
                            />
                            <span onClick={()=>setCnfmPass(!cnfmPass)}>
                                {
                                    cnfmPass ? (<ImEye fontSize={24} />):(<ImEyeBlocked fontSize={24} />)
                                }
                            </span>
                        </label>
                        <button className='bg-yellow-200 px-3 py-2 font-semibold text-white rounded' type='submit'>Reset Password</button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to = "/login"> 
                            <p className="flex items-center gap-x-2 text-richblack-5">  Back To Login </p>  
                        </Link>
                    </div>
                </div>
            )
            // <BiArrowBack />
        
        }
    </div>
  )
}

export default UpdatePassword
