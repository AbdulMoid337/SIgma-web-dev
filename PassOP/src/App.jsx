import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Manager from './Components/Manager'
import Footer from './Components/Footer'

function App() {

  return (
    <>
    <div>
      <Navbar />
      <div className=' [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>

      <Manager />
      </div>
<Footer />
    </div>
    </>
  )
}

export default App
