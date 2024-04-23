import React from 'react'
import HighlightText from './HighlightText'
import Know_your_progress from "../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../assets/Images/Plan_your_lessons.svg";
import Button from './Button';
const LearningLanguageSection = () => {
  return (
    <div className='mt-11'>
        <div className="text-4xl font-semibold text-center my-10">
            Your swiss knife for
            <HighlightText text={"learning any language"} />
            <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
            Using spin making learning multiple languages easy. with 20+
            languages realistic voice-over, progress tracking, custom schedule
            and more.
            </div>
            <div className=' flex md:flex-row flex-col justify-center items-center '> 
                <img src={Know_your_progress} alt='photo'
                className='object-contain md:-mr-32 md:mt-0 mt-12 '/>

                <img src={Compare_with_others} alt='photo'
                className='object-contain md:mt-0 -mt-16'/>
                
                <img src={Plan_your_lessons} alt='photo'
                className='object-contain md:-ml-32  md:mt-0 -mt-24 '/>

            </div>
            <div className="md:mx-[80vh] mx-28">
                <Button active={true} link={"/signup"} >
                    Learn more
                </Button>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection
