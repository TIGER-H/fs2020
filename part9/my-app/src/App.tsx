import React from 'react';
const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  const Header = ({ name }: { name: string }) => {
    return (
      <h1>{name}</h1>
    )
  }

  interface coursePart {
    name: string
    exerciseCount: number
  }
  interface courseParts {
    courseParts: Array<coursePart>
  }

  const Content = ({ courseParts }: courseParts) => {
    return (
      <div>
        {courseParts.map(coursepart => <p key={coursepart.name}>{coursepart.name} {coursepart.exerciseCount}</p>)}
      </div>
    )
  }
  const Total = ({ courseParts }: courseParts) => {
    return (
      <div>
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