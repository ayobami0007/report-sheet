import React from 'react'

const FormInput = ({
    label, value, 
    onChange,
     type="text", 
     placeholder="", 
     className=""
    }) => {
  return (
    <div className='mb-4'>
        <label htmlFor="" className="text-gray-700 font-semibold">
            {label}
        </label>

        <input type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className='w-full  bg-transparent border-b border-dashed border-gray-800 focus:outline-none ${className}' />


    </div>
  )
}

export default FormInput