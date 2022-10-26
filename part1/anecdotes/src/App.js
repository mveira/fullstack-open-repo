import { useState } from 'react'


const Button = (props) => {

  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )

}

const QuoteOfTheDay = (props) => {
 const votes = props.votes
  
  
  const mostVotes = () =>{
    const max = Math.max(...votes)
    return max
  }

  const mostVotesIndex = (vote) =>{
    return props.votes.indexOf(vote)
  }
  if (votes.reduce((a, b) => a+b) === 0 ){
    return  <p>No votes yet...</p>
  }
  return(
    <>
    <h1>Anecdote with the most votes</h1>
    <p>{props.anecdotes[mostVotesIndex(mostVotes())]} </p>
    <p>has {mostVotes()} votes </p>
    </>
    
  )
  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const [selected, setSelected] = useState(0)



  const generateRandomNumber = () =>{
    return(
    Math.floor(Math.random() * anecdotes.length)
    )
  }

  const handleVoteUpdate = (selected) =>{
    const newVotes = [...votes]
    newVotes[selected] += 1 
    setVotes(newVotes)
  }


  return (
    <div>
      <h1> Anecdote Of the day</h1>
      <p>{anecdotes[selected]} </p>
      <p>has {votes[selected]} votes </p>
      <Button handleClick={() => handleVoteUpdate(selected)} text="Vote"></Button>
      <Button handleClick={() => setSelected(generateRandomNumber())} text="Next anecdote"></Button>
      <QuoteOfTheDay votes={votes} anecdotes={anecdotes}/>
      
      
      
    </div>
  )
}

export default App

