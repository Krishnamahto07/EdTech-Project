import React, {useEffect, useState} from 'react'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../../services/operations/authApi';

const VarifyEmail = () => {
    const [otp, setOtp] = useState('');
    const {loading , signupData} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[])

    const submitHandler = (e) =>{
        e.preventDefault();

        const { accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                } = signupData;

        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))
    }
    
  return (
    <div className='text-richblack-25'>
      {
        loading ? (
            <div className='text-4xl'>Loading...</div>
        ):(
            <div className='my-5 flex flex-col justify-center items-center gap-5 '>
                <h1 className='text-3xl  font-semibold '>Verify Email</h1>
                <p className=' text-sm'>A verification code has been sent to you , Enter the code below .</p>

                <form onSubmit={submitHandler}
                className='flex flex-col justify-center items-center gap-4 '>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} className='text-xl p-1  text-richblack-900 font-semibold bg-richblack-5' />}
                />
                <button type='submit' className='bg-yellow-100 hover:font-semibold hover:bg-yellow-50 transition-all  duration-200 ease-linear text-white px-2 py-2 rounded'>Verify Email</button>
                </form>
                <div className='flex justify-center items-center gap-5 '>
                    <div className='bg-richblack-800 px-2 py-1 rounded'>
                        <Link to="/login">
                            <p>Back to Login</p>
                        </Link>
                    </div>
                    <div className='bg-richblack-800 px-2 py-1 rounded'>
                        <button onClick={()=>dispatch(sendOtp(signupData.email,navigate))}>Resend it</button>
                    </div>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default VarifyEmail
