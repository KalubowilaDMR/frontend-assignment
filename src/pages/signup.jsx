import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { signupSchema } from "../schema"
import { authContext } from "../AuthContext"
import { useContext, useState } from "react"

const Signup = () => {

  const [message, setMessage] = useState({
    type:'',
    successMessage:'',
    errorMessage:''
  })
  const { signUp } = useContext(authContext)
  const navigate = useNavigate()

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      conPassword: ''
    },
    validationSchema: signupSchema,
    onSubmit: async(values, {setSubmitting}) => {
      try {
        await signUp({
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          conPassword: values.conPassword
        })
        setMessage({ type:'success', successMessage:'Account created successfully'})
        setTimeout(() =>{
          navigate('/signin')
        }, 10000)
      } catch (error) {
          setMessage({ type:'error', errorMessage: error.message })
      } finally {
        setSubmitting(false)
      }      
    }
  }) 
  console.log(errors);
  

  return (
    <>
      <div className="mx-auto w-5/6 md:w-2/4 lg:w-2/5 xl:w-1/4 h-min bg-white px-12 py-7 shadow-[#dcb9f1] shadow-md mt-10 rounded-xl">
        <div className="w-ful">
            <h2 className="font-semibold text-2xl mb-6">Signup</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
                {message.type !== '' && <div className={`${message.type === 'error' ? 'bg-red-500/70' : 'bg-green-500/70'} text-white text-sm font-medium text-center w-full p-3`}>{message && message.type === 'error'? message.errorMessage : message.successMessage}</div>}
                <div className="d-block mb-3">
                    <label htmlFor="fullName">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full border ${errors.fullName? 'border-red-500': 'border-gray-400'} border-gray-400 px-3 py-2 rounded-md`}
                      required
                    />
                    {errors.fullName && touched.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
                </div>
                <div className="d-block mb-3">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full border ${errors.email? 'border-red-500': 'border-gray-400'} border-gray-400 px-3 py-2 rounded-md`}
                      required
                    />
                    {errors.email && touched.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>
                <div className="d-block mb-3">
                    <label htmlFor="password">Password</label>
                    <input 
                      type="password" 
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full border ${errors.password? 'border-red-500': 'border-gray-400'} border-gray-400 px-3 py-2 rounded-md`}
                      required
                    />
                    {errors.password && touched.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                </div>
                <div className="d-block mb-3">
                    <label htmlFor="conPassword">Confirm Password</label>
                    <input 
                      type="password" 
                      name="conPassword"
                      value={values.conPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full border ${errors.conPassword? 'border-red-500': 'border-gray-400'} border-gray-400 px-3 py-2 rounded-md`}
                      required
                    />
                    {errors.conPassword && touched.conPassword && <span className="text-red-500 text-sm">{errors.conPassword}</span>}
                </div>
                <button type="submit" className="w-full btn bg-[#B660EB] font-semibold text-white p-3 mt-3 rounded-md shadow-none hover:bg-[#7950eb] hover:shadow-xl" disabled={errors.fullName || errors.email || errors.password || errors.conPassword? true:false}>Signup</button>
                <p className="font-normal text-center mt-3">Already have an account? <Link to="/signin" className="text-[#B660EB] hover:underline">Signin</Link></p>                
            </form>
        </div>
      </div>
    </>
  )
}

export default Signup