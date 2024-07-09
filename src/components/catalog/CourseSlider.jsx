import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './style.css';
import Course_Card from './Course_Card';

// import required modules
import { Zoom, Navigation, Pagination } from 'swiper/modules';


export default function CourseSlider({course}) {
    console.log("COURSE SLIDER DATA : ",course)
  return (
      <>
        {
            course?.length > 0 ?(
                <div>
                  <Swiper
                        style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                        }}
                        zoom={true}
                        navigation={true}
                        pagination={{
                        clickable: true,
                        }}
                        modules={[Zoom, Navigation, Pagination]}
                        className="mySwiper"
                    >
                    {
                        course?.map((d,i)=>(
                            <SwiperSlide key={i}><Course_Card course={d} key={i} Height={" max-h-[400px] bg-richblack-600 "}/></SwiperSlide>
                            

                        ))
                    }
                  </Swiper>
                </div>
            ):
            (<p>No Course Found !!!</p>)
        }
    </>
  );
}
