import React from 'react'
import MainLayout from './pages/MainLayout'
import Report from './pages/report'
import   Exam  from './pages/ExamPaperPage'
import BasicReport from './pages/BasicReport'
import SecReport from './pages/SecReport'
import { Route, Routes, useNavigate, BrowserRouter } from 'react-router-dom'


const App = () => {
  return (
   <BrowserRouter>
   <Routes>
   <Route  path='/' element={<MainLayout/>}>
   <Route path='*' element={<h1>Page Not Found</h1>}/>
   <Route path='/report' element={<Report/>}/>
   <Route path='/exam' element={<Exam/>}/>
   <Route path='/sec-Report' element={<SecReport/>}/>
   <Route path='/basic-Report' element={<BasicReport/>}/>

   </Route>
   </Routes>
   </BrowserRouter>
   
  )
}

export default App