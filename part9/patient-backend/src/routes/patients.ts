import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
    try {
        const patient = patientService.getPatient(req.params.id);
        res.json(patient);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/', (req, res) => {
    const newEntry = toNewPatient(req.body);
    // const { name, dateOfBirth, ssn, gender, occupation } = req.body
    const newPatient = patientService.addPatient(newEntry);
    res.json(newPatient);
});

router.get('/:id/entries', (req, res) => {
    try {
        const entries = patientService.getEntry(req.params.id);
        res.json(entries);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body)
        const updatedPatient = patientService.addEntry(req.params.id, newEntry)
        res.json(updatedPatient)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

export default router;