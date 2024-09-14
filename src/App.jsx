import {Routes, Route} from 'react-router-dom'
import {
  Signup,
  Signin,
  Dashboard
} from './pages'
import { Authprovider } from './AuthContext'

function App() {
  
  return (
    <>
      <Authprovider>
        <Routes>
          <Route path='/' Component={Signup}/>
          <Route path='/signin' Component={Signin}/>
          <Route path='/dashboard' Component={Dashboard}/>
        </Routes>
      </Authprovider>
    </>
  )
}

export default App
