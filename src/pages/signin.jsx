/* eslint-disable react/no-unescaped-entities */
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { signinSchema } from "../schema"
import { useContext, useState } from "react"
import { authContext } from "../AuthContext"

const Signin = () => {

  const { signIn } = useContext(authContext)
  const [message, setMessage] = useState({
    type:'',
    successMessage:'',
    errorMessage:''
  })
  const navigate = useNavigate()

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signinSchema,
    onSubmit: async(values, {setSubmitting}) => {
      try {
        await signIn({
          email: values.email,
          password: values.password
        })
        setMessage({ type:'success', successMessage:'User login success' })
        setTimeout(()=>{
          navigate('/dashboard')
        }, 2000)
      } catch (error) {
        setMessage({ type:'error', errorMessage: error.message })
      } finally{
        setSubmitting(false)
      }
    }
  })  

  return (
    <>
      <div className="mx-auto w-5/6 md:w-2/4 lg:w-2/5 xl:w-1/4 h-min bg-white px-12 py-7 shadow-[#dcb9f1] shadow-md mt-20 rounded-xl">
        <div className="w-full">
            <h2 className="font-semibold text-2xl mb-6">Signin</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
                {message.type !== '' && <div className={`${message.type === 'error' ? 'bg-red-500/70' : 'bg-green-500/70'} text-white text-sm font-medium text-center w-full p-3`}>{message && message.type === 'error'? message.errorMessage : message.successMessage}</div>}
                <div className="d-block mb-3">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full border ${errors.email && touched.email? 'border-red-500': 'border-gray-400'} border-gray-400 px-3 py-2 rounded-md`}
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
                      className={`w-full border ${errors.password && touched.password? 'border-red-500': 'border-gray-400'} border-gray-400 px-3 py-2 rounded-md`}
                      required
                    />
                    {errors.password && touched.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                </div>
                <button type="submit" className="w-full btn bg-[#B660EB] font-semibold text-white p-3 mt-3 rounded-md shadow-none hover:bg-[#7950eb] hover:shadow-xl" disabled={errors.email || errors.password ? true : false}>Signin</button>
                <p className="font-normal text-center mt-3">Don't have an account? <Link to="/" className="text-[#B660EB] hover:underline">Signup</Link></p>                
            </form>
        </div>
      </div>
    </>
  )
}

export default Signin