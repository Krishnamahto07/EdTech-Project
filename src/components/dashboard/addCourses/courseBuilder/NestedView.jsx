import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
// import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import {BiDownArrow} from "react-icons/bi"
import SubSectionModal from './SubSectionModal'
import { deleteSection, deleteSubSection } from '../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../redux/slices/courseSlice'

const NestedView = ({handleChangeEditSectionName}) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection , setAddSubSection ] = useState(null);
  const [viewSubSection , setViewSubSection ] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal , setConfirmationModal] = useState(null);

  const handleDeleleSection = async(sectionId) =>{
    const result = await deleteSection(
      {
        sectionId,
        courseId:course._id,
        token,
      }
    );
    if(result){
      dispatch(setCourse(result))
    }
    setConfirmationModal(null);
  }

  const handleDeleteSubSection = async(subSectionId,sectionId) =>{
    const result = await deleteSubSection(
      {
        subSectionId,
        sectionId,
        token
      }
    );

    if(result){
      dispatch(setCourse(result))
    }
    setConfirmationModal(null);
  }

  return (
    <div>
      <div  className="rounded-lg bg-richblack-700 p-6 px-8">
        {
          course?.courseContent?.map((section,index) => (
            <details key={index} open>
              <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu />
                  <p>{section.sectionName}</p>
                </div>
                <div className='flex items-center gap-x-3'>
                  <button onClick={handleChangeEditSectionName(section._id,section.sectionName )}>
                    <MdEdit/>
                  </button>

                  <button
                    onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Section?",
                          text2: "All the lectures in this section will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleleSection(section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        }
                      )
                    }
                  >
                    <RiDeleteBin6Line/>
                  </button>
                  <span>|</span>
                  <BiDownArrow className='text-xl text-richblack-400'/>
                </div>
              </summary>

              <div>
                {
                  section.subSection.map((data) =>(
                    <div key={data?._id}
                    onClick={()=> setViewSubSection(data)}
                    className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"

                    >
                      <div className="flex items-center gap-x-3">
                        <RxDropdownMenu />
                        <p>{data.title}</p>
                      </div>

                      <div className='flex items-center gap-x-3'>
                        <button 
                        onClick={()=> setEditSubSection({...data, sectionId : section._id})} 
                        >
                          <MdEdit/>
                        </button>

                        <button
                          onClick={() =>
                            setConfirmationModal({
                              text1: "Delete this Sub-Section?",
                              text2: "This lecture will be deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () =>
                              handleDeleteSubSection(data._id, section._id),
                              btn2Handler: () => setConfirmationModal(null),
                            })
                          }
                        >
                          <RiDeleteBin6Line className="text-xl text-richblack-300" />
                        </button>

                      </div>
                      
                    </div>
                  ) )
                }

                {/* Add New Lecture to Section */}
                  <button
                    onClick={() => setAddSubSection(section._id)}
                    className="mt-3 flex items-center gap-x-1 text-yellow-50"
                  >
                    <FaPlus className="text-lg" />
                    <p>Add Lecture</p>
                  </button>
              </div>
            </details>
          ))
        }
      </div>
      {
        addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData = {setAddSubSection} add = {true} />)
        :viewSubSection ? (<SubSectionModal modalData={viewSubSection} setModalData = {setViewSubSection} view = {true}/>)
        : editSubSection ? (<SubSectionModal modalData={editSubSection} setModalData = {setEditSubSection} edit = {true}/>)
        :(<div></div>)
      }

      {
        confirmationModal ? (<confirmationModal modalData = {confirmationModal} />)
        :(<div></div>)
      }
    </div>
  )
}

export default NestedView
