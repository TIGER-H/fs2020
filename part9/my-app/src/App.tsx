import React from 'react';
const App: React.FC = () => {
  const courseName = "Half Stack application development";
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CourseNormalPart extends CoursePartWithDescription {
    type: "normal";
    // description: string;
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartWithDescription {
    type: "submission";
    // description: string;
    exerciseSubmissionLink: string;
  }

  interface CoursePartWithDescription extends CoursePartBase {
    description: string
  }

  interface CoursePartSpecial extends CoursePartWithDescription {
    type: "special"
    requirements: Array<string>
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CoursePartSpecial;


  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  const Header = ({ name }: { name: string }) => {
    return (
      <h1>{name}</h1>
    )
  }

  // interface coursePart {
  //   name: string
  //   exerciseCount: number
  // }
  interface courseParts {
    courseParts: Array<CoursePart>
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  const Part = (coursePart: CoursePart) => {
    switch (coursePart.type) {
      case "normal": {
        return (
          <div>
            <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
            <p>{coursePart.description}</p>
          </div>
        )
      }
      case "groupProject": {
        return (<div>
          <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
          <p>groupProject {coursePart.groupProjectCount}</p>
        </div>)
      }
      case "submission": {
        return (
          <div>
            <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
            <p>{coursePart.description}</p>
            <p>submit to {coursePart.exerciseSubmissionLink} </p>
          </div>
        )
      }
      case "special": {
        return (
          <div>
            <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
            <p>{coursePart.description}</p>
            <div>required skills: {coursePart.requirements.map((requirement, index) => <span key={index}>{index === 0 ? requirement : `, ${requirement}`}</span>)}</div>
          </div>
        )
      }
      default:
        return assertNever(coursePart)
    }
  }

  const Content = ({ courseParts }: courseParts) => {
    return (
      <div>
        {courseParts.map((coursepart, index) => <Part {...coursepart} key={index} />)}  {/*为什么可以这么写？ */}
      </div>
    )
  }

  const Total = ({ courseParts }: courseParts) => {
    return (
      <div>
        <br />
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </div>
    )
  }

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />

    </div >
  );
};

export default App;