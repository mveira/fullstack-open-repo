const Header = (props) => {
    return (
      <div>
        <h2>
          {props.course}
        </h2>
      </div>
    )
  }
  
const Part = (props) => {
  // Parts is passed an javascript object with two fields: name and exercises 
  return (
  <div>
    <p>{props.part.name} {props.part.exercises}</p>
  </div>
  )
}

const Content = (props) => {
  const parts = props.parts
  // Content is passed an array with three elements named parts 

  return (
    <div>
      {parts.map(part => <Part part={part}/>)}
    </div>
  )
}

const Total = (props) =>{
    
  return (
    <div>
        <p><b>Total exercises: {props.total} </b></p>
    </div>
  )
}

  const Course = (props) => {
  // The course name is passed to Header
  // The whole parts array is passed to Content and Total 
  const course = props.course
  const total = course.parts.reduce((s, p) => {    
    return s + p.exercises
  },0)
  
  return(
    <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total total={total}/>  
    </div>
  )
  }
  export default Course
