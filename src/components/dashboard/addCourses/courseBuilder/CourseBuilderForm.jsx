import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import { setCourse, setEditCourse, setStep } from '../../../../redux/slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../services/operations/courseDetailsAPI';

const CourseBuilderForm = () => {
  const {register, handleSubmit ,setValue , formState:{errors}} = 
  useForm();
  const [editSectionName,setEditSectionName] = useState(null);
  const { token } = useSelector((state) => state.auth)
  const {course} = useSelector((state)=>state.course)
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);

  const onSubmit = async(data) =>{
    setLoading(true);
    let result;

    if(editSectionName){
      console.log("UPDATE SECTION .....")
      result = await updateSection(
        {
          sectionName:data.sectionName,
          sectionId:editSectionName,
          courseId: course._id,
        }, token
      )
    }
    else {
      console.log("CREATE SECTION .....")

      result = await createSection(
        {
          sectionName:data.sectionName,
          courseId:course._id,
        }, token
      )
    }
    if(result){
      console.log("RESULT ...",result);
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName","")
    }
    else {
      console.log("RESULT nhi aaya ...")
    }
    setLoading(false);
  }

  const cancleEdit = () =>{
    setEditSectionName(null);
    setValue("sectionName","");
  }
  const goBack = () =>{
    dispatch(setStep(1));
    dispatch(setEditCourse(true))
  }
  const goToNext = () =>{
    if(course.courseContent.length === 0){
      toast.error("Please add atleast one section");
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section ..");
      return;
    }

    dispatch(setStep(3));
  }
  const handleChangeEditSectionName = (sectionId,sectionName) =>{
    if(editSectionName === sectionId){
      cancleEdit();
      return;
    }
    
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
  }
  return (
    <div className='text-white '>
      <p className='text-2xl'>Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor='sectionName'>Section Name <sup>*</sup></label>
          <input
            autoFocus
            id='sectionName'
            placeholder='Add section name ...'
            {...register("sectionName",{required:true})}
            className='w-full text-black'
          />
          {
            errors.sectionName && (
              <span>Section Name is Required...</span>
            )
          }
        </div>
        
        <div>
          <IconBtn type="submit" text={editSectionName ? " Edit Section ":" Create Section "}
            outline={true}
            customClasses={" text-white "}
            >

          </IconBtn>
          {
            editSectionName && (
              <button type='button' onClick={()=>cancleEdit()} 
              className=' underline '>
                Cancle Edit
              </button>
            )
          }
        </div>

      </form>

      {
        course?.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }
      <div className='flex  mt-2      '>
        <button onClick={goBack}
        className=' rounded-sm cursor-pointer '>
          Back 
        </button>
        <IconBtn text="Next" onclick={goToNext}>

        </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm
