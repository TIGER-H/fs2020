import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
    try{
        const patient = patientService.getEntry(req.params.id);
        res.json(patient);
    }
    catch(error){
        res.status(400).send(error.message);
    }
});

router.post('/', (req, res) => {
    const newEntry = toNewPatient(req.body);
    // const { name, dateOfBirth, ssn, gender, occupation } = req.body
    const newPatient = patientService.addEntry(newEntry);
    res.json(newPatient);
});

export default router;