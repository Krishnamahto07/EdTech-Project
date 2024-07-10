import React from 'react'
import { buyCourse } from '../../services/operations/studentFeaturesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

const CourseDetails = () => {

    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)
    const dispatch = useDispatch()
    const navigate = useNavigate()

  // Getting courseId from url parameter
  const { courseId } = useParams()
    const handleBuyCourse = () =>{


        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch)
            return
          }
    }
  return (
    <div className='text-richblack-5'>
      <p className='text-2xl'>CourseDetails Page</p>
      <button className='bg-yellow-50 text-black px-5 py-3'
      onClick={()=>handleBuyCourse()}>
        Buy Now
      </button>
    </div>
  )
}

export default CourseDetails
