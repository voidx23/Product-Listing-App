import React from 'react'
import { Link } from 'react-router-dom'

function SideBar() {
  return (
    <div className="h-screen bg-gray-800 text-gray-500 w-80 py-8 border">
    <div className="h-10">
      
    </div>
    <ul className="text-center">
        <li className="py-2 border-t border-b flex justify-center items-center h-20 text-lg font-semibold">
            <Link to="/" className="text-gray-400 hover:text-gray-200">Home</Link>
        </li>
        <li className="py-2  border-b flex justify-center items-center h-20 text-lg font-semibold">
            <Link to="/products" className="text-gray-400  hover:text-gray-200">Products</Link>
        </li>
        <li className="py-2  border-b flex justify-center items-center h-20 text-lg font-semibold">
            <Link to="/category" className="text-gray-400  hover:text-gray-200">Categories</Link>
        </li>
       
       
    </ul>
</div>
  )
}

export default SideBar