import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../utils/avgRating';
import RatingStar from '../common/RatingStars'
import { MdOutlineCurrencyRupee } from "react-icons/md";

const Course_Card = ({course,Height}) => {
    const [avgReviewCount , setAvgReviewCount] = useState(0);

    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count)
    },[course])
  return (
    <div className='bg-richblack-100 p-3  transition-all duration-300 ease-linear hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] '>
        <Link  to={`/courses/${course._id}`}>
            <div>
                <div className="rounded-lg">
                    <img 
                        src={course?.thumbnail}
                        alt='Thumnail of Course'
                        className={` ${Height}  w-full rounded-xl object-cover `}
                    />
                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-2xl text-blue-300 font-bold ">{course?.courseName}</p>
                    <div className='flex flex-row items-center gap-x-5  text-blue-200 '>
                        <p>Instructor <span className='ml-3'> : </span></p>
                        <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        {/* <img src={course?.instructor?.images} width={'50px'} height={'50px'} className='  rounded-full' alt="" /> */}
                    </div>

                    <div className='flex flex-row justify-between items-center  text-yellow-50'>
                        <span > { avgReviewCount || 0 } <span className='text-richblack-5 ml-5 '> Reviews </span></span>
                        <RatingStar Review_Count={avgReviewCount} />
                        <span>{course?.ratingAndReviews?.length} <span className='text-richblack-5  ml-5'>Ratings</span></span>
                    </div>
                    <p className='text-richblack-5  text-xl flex flex-row  items-center'><MdOutlineCurrencyRupee /><span className='  text-yellow-50 ml-5 text-xl font-bold'>{course?.price}</span></p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card
