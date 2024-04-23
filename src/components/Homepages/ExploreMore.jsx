import React, { useState } from 'react'
import {HomePageExplore} from "../../data/homepage-explore"
import HighlightText from './HighlightText';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];

const ExploreMore = () => {
    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [courses , setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard]  =useState(HomePageExplore[0].courses[0].heading)

    function setMyCard(value){
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }

  return (
    <div className='flex items-center flex-col justify-center gap-4'>
        <div className='text-4xl font-semibold text-center flex gap-2'>
            <h1>Unlock the </h1>
            <HighlightText text={" Power of Code "}/>
        </div>
        <p className='text-center text-white'>Learn to build anything you can imagine</p>

        <div className=' flex bg-richblack-700 rounded-full  gap-2 px-2 py-1  '>
            {
                tabsName.map((ele,index) =>{
                    return (
                        <div key={index} onClick={() => setMyCard(ele)} className={` flex bg-richblack-800 rounded-full  px-3 py-1 cursor-pointer text-sm 
                         flex-row items-center gap-2 ${currentTab === ele ?  " bg-richblack-900 text-white " : " text-richblack-50 " }`}>
                            {ele}
                        </div>
                    )
                })
            }
        </div>

        <div className='my-6 w-full h-[2px] bg-richblack-600'></div>

        <div className='mt-8  flex gap-12 '>
            
                {
                    courses.map((course,index)=>{
                        return (
                            <div key={index} className={` top-36 ${index === 0 ? "bg-white text-richblack-800 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]" : "bg-richblack-800  "} flex flex-col w-[300px]
                             justify-center items-center gap-5 mx-5 px-5 py-5 mb-10`}>
                                <h1 className='font-bold text-xl uppercase'>{course.heading}</h1>
                                <p className='text-sm px-2'>{course.description}</p>
                                <div className='flex flex-row  gap-40 font-bold'>
                                    <p>{course.level}</p>
                                    <p>{course.lessionNumber}</p>
                                </div>
                            </div>
                        )
                    })
                }
            
        </div>
    </div>
  )
}

export default ExploreMore
