interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length
  const trainingDays = hours.filter((day) => day !== 0).length
  const average = hours.reduce((acc, cur) => acc + cur) / periodLength
  const success = average > target ? true : false
  let rating, ratingDescription
  if (target - average > 1) {
    rating = 1
    ratingDescription = '不掂。'
  } else if (1 >= target - average && target - average >= -1) {
    rating = 2
    ratingDescription = '可以!'
  } else {
    rating = 3
    ratingDescription = '古德.'
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
