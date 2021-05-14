interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((day) => day !== 0).length;
  const average = hours.reduce((acc, cur) => acc + cur) / periodLength;
  const success = average > target ? true : false;
  let rating, ratingDescription;
  if (target - average > 1) {
    rating = 1;
    ratingDescription = '不掂。';
  } else if (1 >= target - average && target - average >= -1) {
    rating = 2;
    ratingDescription = '可以!';
  } else {
    rating = 3;
    ratingDescription = '古德.';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// interface parsed {
//   hours: Array<number>
//   target: number
// }

// const parse = (args: Array<string>): parsed => {
//   if (args.length < 4) {
//     throw new Error('Invalid amount of arguments');
//   }
//   if (
//     isNaN(Number(args[2])) ||
//     args.slice(3).every((elem) => isNaN(Number(elem)))
//   ) {
//     throw new Error('Arguments must be numbers');
//   }

//   return {
//     hours: args.slice(3).map((e) => Number(e)),
//     target: Number(args[2]),
//   };
// };

// try {
//   const { hours, target } = parse(process.argv);
//   console.log(calculateExercises(hours, target));
// } catch ({message}) {
//   console.error(message);
// }

export default calculateExercises