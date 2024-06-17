import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/navbar.module.css'
import helmentMan from '../assets/helmetMan.png'
import { Link, useNavigate } from 'react-router-dom'
import { server } from '../App'
import axios from 'axios'
import { Context } from '../index'
import toast from 'react-hot-toast'

const Navbar = ({name}) => {
    const navigate = useNavigate() 

    const {isAuthenticated, setIsAuthenticated, setLoading} = useContext(Context)  
    const [user, setUser] = useState({})

    const logoutApi = async () => {
        try {
          const {data} = await axios.get(`${server}/logout`, {withCredentials : true})
          setLoading(false)
          toast.success(data.message)
          setIsAuthenticated(false)
        } catch (error) {
          setIsAuthenticated(true)
          toast.error(error.response.data.message)
        }
      }


  const getMyProfileApi = async () => {
    setLoading(true)
    try {
      const {data} = await axios.get(`${server}/getProfile`, {withCredentials : true})
      setLoading(false)
      setUser(data.profile)
      setIsAuthenticated(true)
    } catch (error) {
      setLoading(false)
      setIsAuthenticated(false)
    }
    
  }

  useEffect(() => {
    getMyProfileApi()
  }, [])

  return (
      <header className={styles.header}>
          <p className={styles.logo}>PedalStart</p> 
          <div className={`${styles.buttons} ${isAuthenticated ? styles.logoutWidth : styles.btnWidth}`}> 
            {
              isAuthenticated ? 
              <>
                <Link onClick={() => logoutApi()} className={styles.logout}>Logout</Link>
                <span className={styles.greet}>Hello! 😃</span>
                <img className={styles.recruiter_img} src={helmentMan} alt="" />
              </> 
              :
            //   <>
            //       <button className={styles.login} onClick={() => navigate('/login')}>Login</button>
            //       <button className={styles.register} onClick={() => navigate('/register')}>Register</button>
            //   </>
                navigate('/login')

            }
              
          </div>
      </header>
  )
}

export default Navbar