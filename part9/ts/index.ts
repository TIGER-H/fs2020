import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (!weight || !height) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }

  return res.status(200).json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

app.post('/exercises', (req, res) => {
  const daily_exercises = (req.body.daily_exercises)// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const target = Number(req.body.target)// eslint-disable-next-line @typescript-eslint/no-explicit-any

  console.log(daily_exercises);
  console.log(target);

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: 'parameters missing',
    });
  }
  if (isNaN(target) || daily_exercises.some(isNaN)) {
    return res.status(400).json({
      error: 'malformatted parameters'
    })
  }

  return res.status(200).json(calculateExercises(daily_exercises, target))
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
