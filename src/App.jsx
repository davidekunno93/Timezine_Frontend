import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigation from './components/Navigation'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Register from './views/Register'
import Login from './views/Login'
import MyCities from './views/MyCities'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navigation />
      <Routes>
        <Route children path='/dashboard' element={<Home />} />
        <Route children path='/register' element={<Register />} />
        <Route children path='/' element={<Login />} />
        <Route children path='/mycities' element={<MyCities />} />
      </Routes>
    </>
  )
}

export default App
