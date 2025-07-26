import React from 'react'
import { Routes, Route } from 'react-router'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster 
        position="top-center" 
        toastOptions={{ duration: 2500 }}
      />
    </>
  )
}

export default App 