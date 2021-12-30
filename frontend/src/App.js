import './App.css'
import { useState } from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import SignIn from './pages/SignIn'
import Home from './pages/Home'

const App = ()=>{
  const [tokenUser, setTokenUser] = useState(false)

  return(
    <>
    <Header/>
    <BrowserRouter>
      <Routes>
        {!tokenUser &&<Route path="/" element={<SignIn setTokenUser={setTokenUser}/>}/>}
        {tokenUser && <Route path="/" element={<Home/>}/>}
        <Route path="*" element={<Navigate to="/" />}/>  
      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  )
}
export default App