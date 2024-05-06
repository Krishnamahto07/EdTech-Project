import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import countryCode from '../../data/countrycode.json'
const ContactForm = () => {
    const [loading , setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors , isSubmitSuccessful},
      } = useForm();
    
      useEffect(()=>{
        if(isSubmitSuccessful){
            reset(
                {
                    email:"",
                    firstName:"",
                    lastName:"",
                    message:"",
                    phoneNo:""
                }
            )
        }
      },[reset,isSubmitSuccessful])

      const submitContactForm = async(data) => {
        console.log(data)
      }
  return (

        // {/* onSubmit={handleSubmit((data) => console.log(data)) */}
        <form onSubmit={handleSubmit(submitContactForm)}  className="flex  flex-col gap-7 border  justify-center items-center">

            <div className="flex flex-col gap-5 lg:flex-row">
                <label>
                    <p>First Name</p>
                    <input placeholder='First Name '
                    type='text'
                    name='firstName'
                    className="form-style px-3 py-2 rounded text-richblack-900"
                     {...register('firstName',{required:true})}
                    />
                    {
                        errors.firstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter firt name
                            </span>
                        )
                    }
                </label>
                <label className="flex flex-col gap-2 lg:w-[48%] text-richblack-900">
                    <p>Last Name </p>
                    <input placeholder='Last Name '
                    type='text'
                    name='lastName'
                    className='px-3 py-2 rounded '
                    {...register('lastName')}
                    />
                </label>
            </div>

            <label>
                <p>Email Address</p>
                <input {...register('email',{required:true})}
                type='email'
                name='email'
                className='px-3 py-2 rounded text-richblack-900'
                placeholder='Enter Email Address ..'
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">Please Enter Email</span>
                    )
                }
            </label>
            <select
            className=" text-richblack-900 px-2 py-2 w-16">
                {
                    countryCode.map((data,index)=>(
                        <option key={index}>{data.code}</option>
                    ))
                }
            </select>
            <label>
                <p>Contact Number</p>
                <input {...register('phoneNo',{required:true})}
                type='tel'
                name='phoneNo'
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                className='px-3 py-2 rounded text-richblack-900'
                placeholder='99999 99999'
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">Please Enter Email</span>
                    )
                }
            </label>


        
            


            <label>
                <p>Message</p>
                <textarea 
                name='message'
                {...register("message",{required:true})}
                cols={30}
                rows={8}
                placeholder='Enter your message here ...'
                className='px-3 py-2 rounded '
                />
                {
                    errors.message && (
                        <span>Please Enter Your message </span>
                    )
                }
            </label>
            <button type='submit' 
            className='px-3 py-2 bg-richblack-100  text-richblack-900 '
            >Send Message</button>
            {/* <input {...register('firstName')}  placeholder='First Name ...'/>
            <input {...register('lastName', { required: true })} placeholder='Last Name ...' />
            {errors.lastName && <p>Last name is required.</p>}
            <input {...register('age', { pattern: /\d+/ })} placeholder='Age ...'/>
            {errors.age && <p>Please enter number for age.</p>}
            <input type="submit" /> */}

        </form>
  )
}

export default ContactForm
