import React from "react"

const Course = ({courses}) => {
    courses.map(course => course.parts)
    return(
      courses.map(course => 
        <div key={course.id}>
          <Header course = {course} />
          <Content course = {course} />
          <Total course = {course} />
        </div>)
    )
  }
  
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    // const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
    const partsArr = course.parts.map(part => part.exercises)
    var sum = partsArr.reduce(
      (acc, cur) => acc + cur, 
      0
    )
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  
  const Part = ({parts}) => {
    return (
      <div>
        {parts.map(part=><p key={part.id}>{part.name} {part.exercises}</p>)}
      </div> 
    )
  }
  
const Content = ({ course }) => {
    return (
      <div>
        <Part parts={course.parts} />
      </div>
    )
}

export default Course