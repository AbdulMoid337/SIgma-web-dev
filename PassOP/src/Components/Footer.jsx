import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gradient-to-r from-black to-[#63e] text-white flex flex-col justify-center items-center w-full fixed bottom-0 h-20 py-4 transition-transform duration-300 hover:scale-105'>
            <div className="logo font-bold text-white text-2xl transition-transform duration-300 hover:rotate-12">
                <span className='text-green-500'> &lt;</span>
                <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='flex justify-center items-center mt-2'>
                Created with 
                <lord-icon
    src="https://cdn.lordicon.com/ulnswmkk.json"
    trigger="hover"
    >
</lord-icon> by CodeWithHarry
            </div>
        </div>
    )
}

export default Footer
