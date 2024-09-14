import { RiDeleteBin6Fill } from "react-icons/ri";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import PropTypes from 'prop-types'
import { useState } from "react";
import { useFormik } from "formik";
import { updateItemSchema } from "../schema";

const AllItems = (props) => {

    // each item data passed from dashboard
    const itemData = {
        id: props.data.id,
        title: props.data.title,
        status: props.data.status,
        description: props.data.description
    }
    let email = props.email
    const getData = props.getData
    // enable update button
    const [updateMode, setUpdateMode] = useState(false)

    const statusOption = {
        completed: 'Completed',
        notCompleted: 'NotCompleted'
    }

    // formik form for update
    const formik = useFormik({
        initialValues:{
            id: itemData.id,
            title: itemData.title,
            status: itemData.status,
            description: itemData.description
        },
        // input validation
        validationSchema: updateItemSchema,
        onSubmit: (values, {setSubmitting}) => {
            // call handle update function
            handleUpdateTodo(values.id)
        }
    })

    const handleUpdateTodo = (id) => {
        try {
            if(!email){
                console.error('User not found')
                return
            }
            const updatedData = {
                id: id,
                title: formik.values.title,
                status: formik.values.status,
                description: formik.values.description
            }
            console.log('formik value', updatedData);  
            const todoData = JSON.parse(localStorage.getItem(email)) || []
            if(todoData) {
                // filter other data not equal to passing id
                const filtereddItems = todoData.filter(item => item.id !== updatedData.id)
                // set data to localstorage with new data
                localStorage.setItem(email, JSON.stringify([...filtereddItems, updatedData]))
                getData()
                setUpdateMode(!updateMode)
                console.log('update success');                    
            }
           
        } catch (error) {
            console.error(error)
        } finally {
            formik.setSubmitting(false)
        }
    }

    const handleDeleteItem = (id,e) => {
        e.preventDefault()
        const todoData = JSON.parse(localStorage.getItem(email)) || []
        if(todoData){
            // filter other data not equal to passing id
            const filterOtheData = todoData.filter(item => item.id !== id)            
            // set data to localstorage with new data
            localStorage.setItem(email, JSON.stringify(filterOtheData))
            getData()
            console.log('delete success');            
        } else {
            alert('No data found')
        }
    }

  return (
    <>
        {/* items */}
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col bg-[#9d9d9d] bg-opacity-15 w-full px-5 py-4 mb-4 rounded-xl shadow-xl">
                <div className="flex w-full mb-3 gap-3">
                    <div className="w-full flex flex-col">
                        <input
                            type="text"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full bg-transparent outline-none border border-t-0 border-x-0 ${formik.errors.title && formik.touched.description? 'border-red-500': 'border-gray-400'} border-gray-400 text-black placeholder:text-black/60 px-3 py-2`}
                            placeholder="Title"
                            readOnly={!updateMode}
                        />
                        {formik.errors.title && formik.touched.title && <span className="text-red-500 text-sm">{formik.errors.title}</span>}
                    </div>
                    {updateMode? (
                        // update todos status
                        <div className="flex flex-wrap md:flex-row w-full md:w-1/5 gap-4 items-center mt-2 md:mt-0">
                            <p className="text-black/50 font-medium">Status</p>
                            <div className="flex flex-row md:flex-col gap-3">
                                <div className="flex items-center">
                                    <input 
                                        type="radio" 
                                        value={statusOption.completed} 
                                        checked={formik.values.status === statusOption.completed}
                                        onChange={formik.handleChange}
                                        name="status" 
                                        className="completed-radio-button"
                                        />
                                    <label htmlFor="completed" className="text-[#45a82d] font-bold pl-1 md:pl-4 text-xs md:text-base">Completed</label>
                                </div>
                                <div className="flex items-center">
                                    <input 
                                        type="radio" 
                                        value={statusOption.notCompleted}
                                        checked={formik.values.status === statusOption.notCompleted}
                                        onChange={formik.handleChange}
                                        name="status" 
                                        className="notcomplete-radio-button"
                                    />
                                    <label htmlFor="completed" className="text-[#F27777] font-bold pl-1 md:pl-4 text-xs md:text-base">Not Completed</label>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // default display status
                        <div className="flex flex-row gap-4 items-center">
                            <p className="text-black/50 font-medium">Status</p>
                            <div className="flex flex-row gap-2 items-center">
                                <span className={`w-4 h-4 ${ itemData?.status === statusOption.completed? 'bg-[#45A82D]' : 'bg-[#F27777]'} rounded-full`}></span>
                                <span className="text-sm md:text-base text-gray-400 font-medium">{itemData?.status === statusOption.completed? statusOption.completed : statusOption.notCompleted}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col mb-3">
                    <textarea 
                        name="description" 
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows={1} 
                        placeholder="Description" 
                        className={`w-full bg-transparent outline-none border border-t-0 border-x-0 ${formik.errors.description && formik.touched.description ? 'border-red-500' : 'border-gray-400'} border-gray-400 text-black placeholder:text-black/60 px-3 py-2`}
                        readOnly={!updateMode}
                    ></textarea>
                    {formik.errors.description && formik.touched.description && <span className="text-red-500 text-sm">{formik.errors.description}</span>}
                </div>                         
                <div className="flex flex-row gap-3 justify-end mt-2">
                    
                    {updateMode? (
                        <>
                            {/* close the update mode */}
                            <button
                                className="btn w-max bg-[#F27777] text-white font-semibold p-1.5 md:p-2 rounded-md shadow-none hover:shadow-xl hover:bg-[#ec6262]"
                                onClick={() => setUpdateMode(!updateMode)}
                            >
                            <IoMdCloseCircleOutline className="w-5 h-5"/>
                            </button>
                            {/* submit button for update todos */}
                            <button
                                onClick={() => handleUpdateTodo(itemData?.id)}
                                className="btn w-max bg-[#3fbe5b] text-white font-semibold p-1.5 md:p-2 rounded-md shadow-none hover:shadow-xl hover:bg-[#36ad50]"
                            >
                                <FaRegCircleCheck className="w-5 h-5"/>
                            </button>
                        </>
                    ):(
                        <>
                            {/* delete button for delete item */}
                            <button
                                className="btn w-max bg-[#F27777] text-white font-semibold p-1.5 md:p-2 rounded-md shadow-none hover:shadow-xl hover:bg-[#ec6262]"
                                onClick={(e) =>handleDeleteItem(itemData?.id,e)}
                            >
                            <RiDeleteBin6Fill className="w-5 h-5"/>
                            </button>
                            {/* update toggle button for enable update mode */}
                            <button
                                onClick={() => setUpdateMode(!updateMode)}
                                className="btn w-max bg-[#eb8c60] text-white font-semibold p-1.5 md:p-2 rounded-md shadow-none hover:shadow-xl hover:bg-[#e07847]"
                            >
                                <HiMiniPencilSquare className="w-5 h-5"/>
                            </button>
                        
                        </>
                    )}
                </div>
            </div>
        </form>      
    </>
  )
}

// prop validation
AllItems.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired,
    email : PropTypes.string.isRequired,
    getData: PropTypes.func.isRequired
}

export default AllItems