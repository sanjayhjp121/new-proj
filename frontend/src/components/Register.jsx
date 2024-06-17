import React, { useState } from 'react'
import styles from '../styles/register.module.css'
import { Link, Navigate } from 'react-router-dom'
import { server } from '../App'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { Context } from '../index'

const Register = () => { 

  const {isAuthenticated, setIsAuthenticated} = useContext(Context)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("teamMember")
  const [loading, setLoading] = useState(false)

  const registerHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
        const {data} = await axios.post(`${server}/register`, {email, password, userType : role}, {withCredentials : true, headers : {"Content-Type" : "application/json"}})

        toast.success(data.message)
        setIsAuthenticated(true)
        setLoading(false)
      } catch (error) {
        toast.error(error.response.data.message)
        setIsAuthenticated(false)
        setLoading(false)
      }
  }

  if(isAuthenticated) return <Navigate to={'/dashboard'}/>

  return (
    <>

        <div className={styles.container}>
      <div className={styles.left_part}>
            <form onSubmit={registerHandler} className={styles.form}>
                <p className={styles.create_accnt}>Create an account</p>
                <p className={styles.bio}>Welcome to PedalStart</p>
                <br />
                <input required type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <br />
                <input required autoComplete="current-password" type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <br />
                <br />
                <div onChange={(e) => setRole(e.target.value)}> 
                  <input type="radio" value="admin" name="role" /> Admin
                  <input style={{marginLeft: "1rem"}} type="radio" value="teamMember" name="role" defaultChecked /> Team Member
                </div>
                <br />
                <br />
                <span><input required type="checkbox" name="checkbox" style={{marginRight : '10px', color : '#525252'}} />By creating an account, I agree to our terms of use and privacy policy</span>
                <br />
                <br />
                <button >{loading ? "Creating..." : "Create Account"}</button>
                <br />
                <br />
                <p style={{color : '#525252'}}>Already have an account? <Link to={'/login'} style={{fontWeight: '700', color: 'black'}}>Sign In</Link></p>
            </form> 
      </div>
      <div className={styles.right_part}>
            {/* using image here  */}
            <p>Welcome to PedalStart</p>
      </div>
    </div>
    </>
  )
}

export default Register