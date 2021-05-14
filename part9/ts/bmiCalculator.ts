const categories = [
  'Very severely underweight',
  'Severely underweight',
  'Underweight',
  'Normal (healthy weight)',
  'Overweight',
  'Obese Class I (Moderately obese)',
  'Obese Class II (Severely obese)',
  'Obese Class III (Very severely obese)',
];

const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / Math.pow(height / 100, 2);
  if (bmi <= 15) {
    return categories[0];
  }
  if (bmi <= 16) {
    return categories[1];
  }
  if (bmi <= 18.5) {
    return categories[2];
  }
  if (bmi <= 25) {
    return categories[3];
  }
  if (bmi <= 30) {
    return categories[4];
  }
  if (bmi <= 35) {
    return categories[5];
  }
  if (bmi <= 40) {
    return categories[6];
  } else {
    return categories[7];
  }
};
export default calculateBmi;

// interface parsedArgs {
//   height: number
//   weight: number
// }

// const parseArgs = (args: Array<string>): parsedArgs => {
//   if (args.length !== 4) {
//     throw new Error('Invalid amount of arguments')
//   }
//   if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
//     throw new Error('Arguments must be numbers')
//   }

//   return {
//     height: Number(args[2]),
//     weight: Number(args[3]),
//   }
// }

// try {
//   const { height, weight } = parseArgs(process.argv)
//   console.log(calculateBmi(height, weight))
// } catch (e) {
//   console.error(e.message)
// }
