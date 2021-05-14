const categories = [
  'Very severely underweight',
  'Severely underweight',
  'Underweight',
  'Normal (healthy weight)',
  'Overweight',
  'Obese Class I (Moderately obese)',
  'Obese Class II (Severely obese)',
  'Obese Class III (Very severely obese)',
]

const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / Math.pow(height / 100, 2)
  if (bmi <= 15) {
    return categories[0]
  }
  if (bmi <= 16) {
    return categories[1]
  }
  if (bmi <= 18.5) {
    return categories[2]
  }
  if (bmi <= 25) {
    return categories[3]
  }
  if (bmi <= 30) {
    return categories[4]
  }
  if (bmi <= 35) {
    return categories[5]
  }
  if (bmi <= 40) {
    return categories[6]
  }
  if (bmi > 40) {
    return categories[7]
  }
}

console.log(calculateBmi(170, 56))
