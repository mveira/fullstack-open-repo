import { useState } from 'react'

const Button = (props) =>{
  return(
  
  <button onClick={props.handleClick}>{props.text}</button>
  
  )
}
const SatisticLine = (props) =>{
  return(
  <div>
    <p>{props.text} {props.value}</p>
  </div>
  )
}

const Satistics = (props) => {
  const {good, neutral, bad, allClicks} = props
  const positive = (good, total) => {return (good / total) * 100 + " %"}
  const avg = (clicks) => { return clicks.reduce((a, b) => a+b) / clicks.length} 

  if (!props.allClicks.length){
    return (
      <div>
        No feedback given 
      </div>
    )
  }

  return (
    <div>
       <SatisticLine  text="bad" value={bad}/>
       <SatisticLine  text="good" value={good}/>
       <SatisticLine  text="neutral" value={neutral}/>
       <SatisticLine  text="all " value={allClicks.length}/>
       <SatisticLine  text="Average " value={avg(allClicks)}/>
       <SatisticLine  text="Positive " value={positive(good, allClicks.length)}/>

    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([]) 
  
  const handleGoodClick = () =>{
      setGood(good + 1)
      setAll(allClicks.concat(1))

    }

  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)
    setAll(allClicks.concat(0))

  }

  const handleBadClick = () =>{
    setBad(bad + 1)
    setAll(allClicks.concat(-1))
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => handleGoodClick() } text="Good" />
      <Button handleClick={() => handleNeutralClick()}  text="Neutral"/>
      <Button handleClick={() => handleBadClick()} text="Bad"/>
      
      <h2>Satistics</h2>
     <Satistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}/>
     
    </div>
    
  )
}

export default App
  