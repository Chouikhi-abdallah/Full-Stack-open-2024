const Header=(props)=>{
  console.log(props)
  return (<h1>{props.course}</h1>);
}
const Content=(props)=>{
  return(
  <div>
  {props.parts.map((part,index)=>(
  <p key={index}>
    {part.name} : {part.exercises}
  </p>
  )
  )}
  </div>
  )
}
const Total=(props)=>{
  return (
    <p>
      {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
    </p>
  )
}
const App =()=>{
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  console.log(course);
  return (
    <>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </>
  )


}; 
export default App;