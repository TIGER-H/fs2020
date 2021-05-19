import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json()); //middleware!
app.use(cors());
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    res.send('good');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});