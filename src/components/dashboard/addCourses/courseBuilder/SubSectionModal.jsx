import React,{useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch ,useSelector} from 'react-redux';

const SubSectionModal = (
    {
        modalData,
        setModalData,
        add = false,
        view = false,
        edit = false,
    }
) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,
      } = useForm();

        const dispatch = useDispatch();
        const [loading, setLoading] = useState(false)
        const { token } = useSelector((state) => state.auth)
        const { course } = useSelector((state) => state.course)

        useEffect(()=>{
            if (view || edit) {
                // console.log("modalData", modalData)
                setValue("lectureTitle", modalData.title)
                setValue("lectureDesc", modalData.description)
                setValue("lectureVideo", modalData.videoUrl)
              }
        },[]);

  // detect whether form is updated or not
        const isFormUpdated = () => {
            const currentValues = getValues()
            // console.log("changes after editing form values:", currentValues)
            if (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
            ) {
            return true;
            }
            return false;
        }


  return (
    <div>
      
    </div>
  )
}

export default SubSectionModal
