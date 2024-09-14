import { useCallback, useContext, useEffect, useState } from "react"
import { authContext } from "../AuthContext"
import Header from "../componenst/header"
import AllItems from "../componenst/items"
import { useLocation, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { addItemSchema } from "../schema"

// generate unique id function
function uidGenerator() {
    const date = Date.now()
    const randomInt = Math.floor(Math.random() * 1000)
    const uid = date + randomInt
    return uid
}

const Dashboard = () => {

    const { currentUser } = useContext(authContext)
    const navigate = useNavigate()
    const location = useLocation()
    // status object for all task types
    const status = {
        completed: 'Completed',
        notCompleted: 'NotCompleted'
    }
    const [itemData, setItemData] = useState([])

    // get current user
    const user = location.state?.user || currentUser()
    
    // retrieve data from localstorage
    const getData = useCallback(() => {
        const todoData = JSON.parse(localStorage.getItem(user?.email)) || []
        setItemData(todoData)
    },[user?.email])    
    
    useEffect(() => {
        if(!user) {
        navigate("/signin")
        }
        getData()     
    }, [currentUser, navigate, getData, user])

    // add new item
    const { values, handleChange, handleBlur, handleSubmit, errors, touched, resetForm } = useFormik({
        initialValues: {
            id:'',
            title: '',
            status: '',
            description: ''
        },
        validationSchema: addItemSchema,
        onSubmit: async(values, {setSubmitting}) => {
            try {
                if(!user || !user.email){
                    console.error('User not found')
                    return
                }

                // generate new id to pass to new item
                const newId = uidGenerator()
                const newItem = {
                    id: newId,
                    title: values.title,
                    status: status.notCompleted,
                    description: values.description
                }
                // get current user email tot set localstorage key
                const email = user.email
                // find current data in localstorage or empty array
                const existsData = JSON.parse(localStorage.getItem(email)) || []
                // push new data to localstorage variable
                existsData.push(newItem)
                //  set new localtorage item
                localStorage.setItem(email, JSON.stringify(existsData))
                // reset form
                setSubmitting(false)
                resetForm()
                getData()
            } catch (error) {
                console.error(error)
                setSubmitting(false)
            }
        }
    })

  return (
    <>
        <div className="flex flex-col w-full min-h-screen">
            {/* header */}
            <Header name={user?.fullName}/>

            <div className="flex flex-col w-4/5 mx-auto gap-7 mt-10">
                {/* add items */}
                <div className="w-full bg-white px-5 md:px-10 py-4 rounded-xl shadow-xl">
                    <h2 className="font-semibold text-2xl mb-4">Add Items</h2>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className="bg-[#9d9d9d] bg-opacity-25 w-full px-5 py-4 rounded-xl">
                            <div className="flex flex-col md:flex-row w-full mb-3">
                                <div className="w-full flex flex-col">
                                    <input
                                        type="text"
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full md:w-4/5 bg-transparent outline-none border border-t-0 border-x-0 ${errors.title && touched.description? 'border-red-500': 'border-gray-400'} border-gray-400 text-black placeholder:text-black/60 px-3 py-2`}
                                        placeholder="Title"
                                    />
                                    {errors.title && touched.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                                </div>
                            </div>
                            <div className="flex flex-col mb-3">
                                <textarea 
                                    name="description" 
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    rows={1} 
                                    className={`w-full bg-transparent outline-none border border-t-0 border-x-0 ${errors.description && touched.description? 'border-red-500': 'border-gray-400'} border-gray-400 text-black placeholder:text-black/60 px-3 py-2`} 
                                    placeholder="Description"
                                ></textarea>
                                {errors.description && touched.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                            </div>                            
                        </div>
                        <button type="submit" className="btn bg-[#8660EB] text-white font-semibold px-3 md:px-5 py-1.5 md:py-2 text-sm md:text-base rounded-md shadow-none hover:shadow-xl hover:bg-[#7950eb] float-right mt-2">Add</button>
                    </form>
                </div>
                {/* all items */}
                <div className="w-full bg-white px-7 py-5 rounded-xl shadow-xl">
                    <h2 className="font-semibold text-xl text-center mb-5">All Items</h2>
                    {itemData?.map((item) => (
                        <AllItems key={item.id} data={item} email={user.email} getData={getData}/>
                    ))}
                </div>
            </div>            
        </div>
    </>
  )
}

export default Dashboard