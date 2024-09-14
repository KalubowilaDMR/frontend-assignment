import * as Yup from 'yup'

export const signupSchema = Yup.object({
    fullName: Yup.string().min(3, 'Must be at least 3 characters').required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email address is required'),
    password: Yup.string().min(8, 'Must be at least 8 characters').required('Password is required'),
    conPassword: Yup.string().oneOf([Yup.ref('password')], 'Password must match').required('Confirm Password is required')
});

export const signinSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email address is required'),
    password: Yup.string().min(8, 'Must be at least 8 characters').required('Password is required')
})

export const addItemSchema = Yup.object({
    id: Yup.number().positive().integer(),
    title: Yup.string().min(3, 'Must be at least 3 characters').max(50, 'Must be at most 50 characters').required('Title is required'),
    status: Yup.string().oneOf(['completed', 'notCompleted']).default('notCompleted'),
    description: Yup.string().min(3, 'Must be at least 3 characters').max(200, 'Must be at most 200 characters').required('Description is required')
})

export const updateItemSchema = Yup.object({
    id: Yup.number().positive().integer(),
    title: Yup.string().min(3, 'Must be at least 3 characters').max(50, 'Must be at most 50 characters').required('Title is required'),
    status: Yup.string().oneOf(['completed', 'notCompleted']).default('notCompleted'),
    description: Yup.string().min(3, 'Must be at least 3 characters').max(200, 'Must be at most 200 characters').required('Description is required')
})
