import React from 'react'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


export const server = "https://plypicker-task.onrender.com/api/v1/user"

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/*' element={<Register/>}></Route>
        </Routes>
        <Toaster />
      </Router> 
  )
}

export default App
