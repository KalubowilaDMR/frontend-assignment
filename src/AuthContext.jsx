import { useState, createContext } from 'react'

export const authContext = createContext()

// eslint-disable-next-line react/prop-types
export const Authprovider = ({children}) => {
    const [authData, setAuthData] = useState({isAuthenticated: false, userData: null})

    // Helper function to get users from localStorage
    const getUsers = () => {
        try {
            const usersJSON = localStorage.getItem('Users')
            const users = JSON.parse(usersJSON)
            return Array.isArray(users) ? users : []
        } catch (error) {
            console.error('Error getting users:', error)
            return []
        }
    }

    // check existing email address
    const findExistingEmail = (email) => {
        const users = getUsers()
        return users.some(user => user.email === email)
    }

    const signUp = (data) => {
        try {
            if(findExistingEmail(data.email)){
                throw new Error('Email address already exists')            
            }
            
            const users = getUsers()
            users.push(data)
            localStorage.setItem('Users', JSON.stringify(users))
            setAuthData({
                isAuthenticated: true,
                userData: data
            })
        } catch (error) {
            console.error('Error in signUp:', error)
            throw error
        }
    }

    const signIn = (data) => {
        try {
            const users = getUsers()
            const user = users.find(user => user.email === data.email && user.password === data.password)
            
            if (!user) {
                throw new Error('Invalid email or password')
            }

            setAuthData({
                isAuthenticated: true,
                userData: user
            })
        } catch (error) {
            console.error('Error in signIn:', error)
            throw error
        }
    }

    const signOut = () => {
        setAuthData({
            isAuthenticated: false,
            userData: null
        })
    }

    const currentUser = () => {
        return authData.userData
    }

    return(
        <authContext.Provider value={{ authData, signUp, signIn, signOut, currentUser }}>
            {children}
        </authContext.Provider>
    )
}