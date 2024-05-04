import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { RiStarSFill } from "react-icons/ri";
import { RiStarSLine } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";
import { removeFromCart } from '../../../redux/slices/cartSlice';



const RenderCartCourses = () => {
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch();
  return (
    <div>
        {
            cart.map((course , index) => (
                <div>
                    <div>
                        <img src={course?.thumbnail} alt='Thumbnail' loading='lazy'/>
                        <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.category?.name}</p>
                            <div>
                                <span>4.5</span>
                                <ReactStars 
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<RiStarSFill />}
                                    fullIcon = {<RiStarSLine />}
                                    
                                />
                                <span>{course?.ratingAndReviews?.length} Rating</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                        onClick={()=> dispatch(removeFromCart(course._id))}
                        className='flex justify-center items-center'>
                            <MdOutlineDeleteForever />
                            <p>Remove</p>
                        </button>

                        <p>Rs {course?.prise}</p>
                    </div>
                </div>
            ))   
        }
    </div>
  )
}

export default RenderCartCourses
