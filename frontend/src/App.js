import './App.css'
import { useEffect, useState } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import SignIn from './pages/SignIn'
import Home from './pages/Home'

const App = ()=>{
  const [tokenUser, setTokenUser] = useState(false)

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setTokenUser(true)
    }
  },[])

  return(
    <Routes>
      {!tokenUser &&<Route path="/" element={<SignIn setTokenUser={setTokenUser}/>}/>}
      {tokenUser && <Route path="/" element={<Home/>}/>}
      <Route path="*" element={<Navigate to="/" />}/>  
    </Routes>
  )
}
export default App