import React from 'react'
import { Link } from 'react-router-dom'
import { IoArrowRedoOutline } from "react-icons/io5";
import HighlightText from '../Homepages/HighlightText';
import Button from '../Homepages/Button';
// import Banner from ".../assets/Images/banner.mp4"
import Banner from "../../assets/Images/banner.mp4"
import CodeBlocks from '../Homepages/CodeBlocks';
import "../../App.css"
import Timeline from '../Homepages/Timeline';
import LearningLanguageSection from '../Homepages/LearningLanguageSection';
import InstructorSection from '../Homepages/InstructorSection';
import Footer from '../common/Footer';
import ExploreMore from '../Homepages/ExploreMore';

const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className=' relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-center'>
            
            <Link to={"/signup"} >
                <div className='bg-richblack-800  mt-16 border rounded-full  hover:scale-95 transition-all duration-200 ease-linear
                group'>
                    <div className=' group-hover:bg-richblack-900 transition-all duration-200 px-5 py-2 m-1 rounded-full flex justify-center items-center gap-2'>
                        <p>Become an Instructor </p>
                        <IoArrowRedoOutline />
                    </div>
                </div>
            </Link>

            <div className='flex md:flex-row flex-col md:gap-2 text-center md:text-4xl text-2xl font-semibold mt-8 '>
                <h2>Empower Your Future With </h2>
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className="w-10/12 mt-5 text-center text-xs font-bold text-richblack-300">
                With our online coding courses, you can learn at your own pace, from
                anywhere in the world, and get access to a wealth of resources,
                including hands-on projects, quizzes, and personalized feedback from
                instructors.
            </div>

            <div className='flex gap-4 mt-8'>
                <Button active={true} link={"/signup"}>Learn more</Button>
                <Button active={false} link={"/login"}>Book a Demo</Button>
            </div>

            <div className='w-8/12 mx-auto my-8 border border-blue-50 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'>
                <video muted loop autoPlay>
                    <source src={Banner}/>
                </video>
            </div>

            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div>
                            Unlock Your 
                            <HighlightText text={" coding potential "} />
                            with our online courses
                        </div>
                    }
                    subheading = {
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            text:"try it Yourself",
                            link:"/signup",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            text:"Learn more",
                            link:"/signup",
                            active:false
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
                    codeColor={"text-blue-50"}
                    backgroundGradient={"shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]"}
                />


                <CodeBlocks 
                    position={"flex-row-reverse"}
                    heading={
                        <div >
                            Start 
                            <HighlightText text={" coding in seconds "} />
                        </div>
                    }
                    subheading = {
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            text:"Continue Lesson",
                            link:"/signup",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            text:"Learn more",
                            link:"/signup",
                            active:false
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
                    codeColor={"text-[#F7418F]"}
                    backgroundGradient={"shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"}
                />
            </div>

            <ExploreMore/>

      </div>

      {/* Section 2 */}
      <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='bgImg h-[310px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='flex text-white  gap-5'>
                        <Button active={true} link={"/signup"}>
                            Explore Full Catalog
                        </Button>
                        <Button active={false} link={"/login"}>
                            Learn more
                        </Button>
                    </div>

                </div>

            </div>

            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 md:mt-0 mt-[100px]">
            {/* Job that is in Demand - Section 1 */}
                <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                    <div className="text-4xl font-semibold lg:w-[45%] ">
                        Get the skills you need for a{" "}
                        <HighlightText text={"job that is in demand."} />
                    </div>

                    <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                        <div className="text-[16px]">
                            The modern StudyNotion is the dictates its own terms. Today, to
                            be a competitive specialist requires more than professional
                            skills.
                        </div>
                        <Button active={true} link={"/signup"}>
                            Learn more
                        </Button>
                    </div>

                </div>

                <Timeline />
                <LearningLanguageSection/>
            </div>
      </div>

      {/* Section - 3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex flex-col  items-center justify-center
        gap-8  bg-richblack-900 text-white md:mt-28 mt-10'>

                    <InstructorSection />

                    <h2>Reviews From Learners </h2>

                    {/* Review slide for student  */}
      </div>

      {/* Footer section */}
      <Footer />
    </div>
  )
}

export default Home
