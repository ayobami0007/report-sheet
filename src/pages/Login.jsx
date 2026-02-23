// import React, { useState } from 'react'
// import { NavLink as RouterNavLink } from 'react-router-dom'

// function SideBarLink({ to, icon: Icon, label, onClick, children }) {
//   const [open, setOpen] = useState(false)

//   // If there are children, clicking toggles dropdown
//   const handleClick = () => {
//     if (children) {
//       setOpen(!open)
//     }
//     if (onClick) {
//       onClick()
//     }
//   }

//   if(!children){
//   return (
//     <div>
//       {/* Parent link */}
//       <div
//         onClick={handleClick}
//         className="cursor-pointer p-2 rounded flex items-center gap-2 border-l-4 
//           hover:bg-blue-700 transition-colors"
//       >
//         {Icon && <Icon className="w-5 h-5" />}
//         <span>{label}</span>
//         {children && <span className="ml-auto">{open ? "▲" : "▼"}</span>}
//       </div>

//       {/* Dropdown submenu (only if children exist) */}
//       {children && (
//         <div
//           className={`transition-all duration-300 ease-in-out overflow-hidden ${
//             open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
//           }`}
//         >
//           <div className="flex flex-col ml-6 gap-2">
//             {children}
//           </div>
//         </div>
//       )}
//     </div>
//   )}

//   return(
//     <div>
        
//     </div>
//   )
// }

// export default SideBarLink
