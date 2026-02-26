import React from 'react'
import ScoreInput from '../common/result/ScoreInput'


const HeaderSection = ({examData, setExamData}) => {

    const handleChange = (e) =>{
        const{name, value} = e.target;
        setExamData(prev => ({
            ...prev,
            [name] : value
        }))
    }

  return (
    <div>
<h2>SUPREME COLLEGE</h2>
<h3>Motto: Knowledge is the key to success</h3>
<h3>31, Opomalu Street, Ilorin, Kwara State</h3>

<ScoreInput value={examData.subject}
 onChange={handleChange} 
 placeholder='Subject' />

 <ScoreInput value={examData.className}
 onChange={handleChange} 
 placeholder='Class' />

 <ScoreInput value={examData.term}
 onChange={handleChange} 
 placeholder='Term' />

 <ScoreInput value={examData.session}
 onChange={handleChange} 
 placeholder='Session' />

 <ScoreInput value={examData.timeAllowed}
 onChange={handleChange} 
 placeholder='Time Allowed' />


    </div>
  )
}

export default HeaderSection