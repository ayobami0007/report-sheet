// import React, { use, useState } from 'react'
// import { NavLink } from 'react-router-dom'

// function SideBarLink({ to, icon: Icon, label, onClick, children }) {
//   const [open, setOpen] = useState(false)
//   const handleClick = () => {
//     if (children) {
//       setOpen(!open)
//     }
//     if (onClick) {
//       onClick()
//     }
//   }
//   if (!children) {
//     return (
//       <NavLink to={to}
//         onClick={onClick}
//         className={({ isActive }) =>
//           `p-2 rounded flex items-center gap-2 border-l-4 
//         ${isActive
//             ? "border-white bg-white text-blue-400 font-semibold"
//             : "border-transparent hover:bg-blue-700"}`
//         }>
//         {Icon && <Icon className="w-5 h-5" />}
//         {label}

//       </NavLink>
//     )
//   }

//   return (
//     <div>
//       <div onClick={handleClick}
//         className="cursor-pointer p-2 rounded flex items-center gap-2 border-l-4 hover:bg-blue-700 transition-colors">
//         {Icon && <Icon className="w-5 h-5" />}
//         <span>{label}</span>
//         <span className='ml-auto'> {open ? "▲" : "▼"}</span>
//       </div>
//       <div
//         className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
//           }`}>

//         <div className="flex flex-col ml-6 gap-2">
//           {React.Children.map(children, child => {
//             // If child is a NavLink, override its className to handle active styling
//             if (child.type === NavLink) {
//               return React.cloneElement(child, {
//                 className: ({ isActive }) =>
//                   `p-2 rounded transition-colors ${
//                     isActive
//                       ? "bg-white text-blue-600 font-semibold"
//                       : "hover:bg-blue-600 text-white"
//                   } ${child.props.className || ""}`
//               })
//             }
//             return child
//           })}
//         </div>

//       </div>
//     </div>
//   )
// }



// export default SideBarLink


import React, { useState, useRef, useEffect } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'

function SideBarLink({ to, icon: Icon, label, onClick, children }) {
  const [open, setOpen] = useState(false)
  const [height, setHeight] = useState(0)
  const contentRef = useRef(null)

  // Recalculate height whenever children change
  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [children])

  const handleClick = () => {
    if (children) setOpen(!open)
    if (onClick) onClick()
  }

  if (!children) {
    return (
      <RouterNavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `p-2 rounded flex items-center gap-2 border-l-4 
          ${isActive
            ? "border-white bg-white text-blue-400 font-semibold"
            : "border-transparent hover:bg-blue-700"}`
        }
      >
        {Icon && <Icon className="w-5 h-5" />}
        {label}
      </RouterNavLink>
    )
  }

  return (
    <div>
      {/* Parent toggle */}
      <div
        onClick={handleClick}
        className="cursor-pointer p-2 rounded flex items-center gap-2 border-l-4 
          hover:bg-blue-700 transition-colors"
      >
        {Icon && <Icon className="w-5 h-5" />}
        <span>{label}</span>
        <span className="ml-auto">{open ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown submenu with dynamic height */}
      <div
        style={{ maxHeight: open ? height : 0 }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <div ref={contentRef} className="flex flex-col ml-6 gap-2">
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              className: ({ isActive }) =>
                `p-2 rounded text-sm transition-colors ${
                  isActive
                    ? "bg-white text-blue-600 font-semibold"
                    : "hover:bg-blue-600 text-white"
                } ${child.props.className || ""}`
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default SideBarLink
