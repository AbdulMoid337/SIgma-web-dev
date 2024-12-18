import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-gradient-to-r from-black to-[#63e] text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

                <div className="logo font-bold text-white text-2xl transition-transform duration-300 hover:scale-105">
                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                </div>
                <ul className='flex gap-4'>
                    <li>
                        <a className='hover:font-bold transition-colors duration-300 text-gray-300 hover:text-green-500' href='/'>Home</a>
                    </li>
                    <li>
                        <a className='hover:font-bold transition-colors duration-300 text-gray-300 hover:text-green-500' href='#'>About</a>
                    </li>
                    <li>
                        <a className='hover:font-bold transition-colors duration-300 text-gray-300 hover:text-green-500' href='#'>Contact</a>
                    </li>
                </ul>
               
            </div>
        </nav>
    )
}

export default Navbar
