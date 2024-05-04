import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn'

const RenderTotalAmout = () => {
    const {total , cart} = useSelector((state) => state.cart)
    const handlerBuyCourse = () =>{
        const courses = cart.map((course) => course._id)

        console.log("Bought these course : ",courses)
    }
  return (
    <div>
        <p>Total : </p>
        <p>Rs {total}</p>

        <IconBtn 
            text="Buy Now"
            onclick={handlerBuyCourse}
            customClasses={"w-full justify-center"}
        />
    </div>
  )
}

export default RenderTotalAmout
