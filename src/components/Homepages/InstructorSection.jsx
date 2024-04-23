import React from 'react'
import HighlightText from './HighlightText'
import Instructor from "../../assets/Images/Instructor.png"
import Button from './Button'
const InstructorSection = () => {
  return (
    <div className='flex items-center justify-center gap-14'>
        <div className='w-1/2 shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]'>
            <img src={Instructor} alt='instructor img'
            className='' />
        </div>

        <div className='w-1/2 flex flex-col md:gap-5 gap-4'>
            <div className='w-full flex md:flex-row flex-col md:gap-2 md:text-4xl text-xl font-semibold '>
                <h1>
                    Become an 
                </h1>
                <HighlightText text=" Instructor" />
            </div>
            <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>
            <div className='w-fit'>
            <Button active={true} link={"/signup"}>
                Start Learning
            </Button>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection
