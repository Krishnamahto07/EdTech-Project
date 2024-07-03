import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../../utils/constants';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../redux/slices/courseSlice';

const CoursesTable = ({ courses, setCourses }) => {
    console.log("RES ", courses);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const handleCourseDelete = async (courseId) => {
        setLoading(true);
        await deleteCourse({ courseId: courseId }, token);
        const result = await fetchInstructorCourses(token);

        if (result) {
            setCourse(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }
    return (
        <div className='text-white'>
            <Table className="rounded-xl border border-richblack-800 ">
                <Thead>
                <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                    <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                    Courses
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                    Duration
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                    Price
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                    Actions
                    </Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        courses.length === 0 ?
                            (<Tr>
                                <Td>No Courses Found !!!</Td>
                            </Tr>) :
                            (courses.map((course) => (
                                <Tr key={course._id}
                                    className="flex gap-x-10 border-richblack-800 p-8 text-richblack-5">
                                    <Td className="flex gap-x-4"
                                    >
                                        <img src={course.thumbnail}
                                            className='h-[150px] w-[150px] rounded-md object-cover'
                                        />
                                        <div className='flex flex-col'>
                                            <p>{course.courseName}</p>
                                            <p>{course.courseDescription}</p>
                                            {
                                                course.status === COURSE_STATUS.DRAFT ?
                                                    (
                                                        <p className='text-pink-50 '>DRAFTED</p>
                                                    ) :
                                                    (
                                                        <p className='text-yellow-5'>PUBLISHED</p>
                                                    )
                                            }
                                        </div>
                                    </Td>
                                    <Td>2hr 30min</Td>
                                    <Td>${course.price}</Td>
                                    <Td>
                                        <button disabled={loading}
                                        // onClick={()=>{

                                        // }}
                                        >Edit</button>
                                        <button disabled={loading}
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Do you want to delete this course ?",
                                                    text2: "All the data related to this course will be deleted ",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancle",
                                                    btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => { },
                                                    btn2Handler: !loading ? () => setConfirmationModal(null) : () => { }

                                                })
                                            }}>Delete</button>
                                    </Td>
                                </Tr>
                            ))
                            )
                    }
                </Tbody>
            </Table>

        </div>
    )
}

export default CoursesTable
