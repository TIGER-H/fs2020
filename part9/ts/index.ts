import express from 'express'
import calculateBmi from './bmiCalculator'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack')
})

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight)
  const height = Number(req.query.height)

  if (!weight || !height) {
    return res.status(400).json({
      error: 'malformatted parameters',
    })
  }

  return res.status(200).json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
