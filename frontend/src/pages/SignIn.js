import {useState} from 'react'
import axios from 'axios'

const SignIn = ({setTokenUser})=>{
    const [user, setUser] = useState({mail:'', password:''})
    const [error, setError] = useState({view:false, message:''})

    const inputHandler = (e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }
    const signInHandler = ()=>{
        axios.post("http://localhost:4000/api/user/signin", user)
        .then(res=>{ 
            if(res.data.success){
                localStorage.setItem('token',res.data.res.token)
                setTokenUser(true)
            }else{
                console.log(res.data.res)
                setError({view:true, message:res.data.res})
            }
        })
        .catch(err=>console.log(err))
    }

    return(
        <div className='mainSign'>
            <div>
                <h2>Tipie</h2>
                <p>Login to your account</p>
                <div className='error'>
                    {error.view && <p>* {error.message}</p>}
                </div>
                <input type='email' required placeholder='E-mail' name='mail' onChange={inputHandler}/>
                <input type='password' required placeholder='Password' name='password' onChange={inputHandler}/>
                <input type="submit" value="Sign In" onClick={signInHandler} disabled={!user.mail && !user.password}/>
            </div>
        </div>
    )
}

export default SignIn