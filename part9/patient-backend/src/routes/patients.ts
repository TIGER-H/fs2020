import express from 'express'
import patientService from '../services/patientService'
import { toNewPatient } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(patientService.getEntres())
})

router.post('/', (req, res) => {
    const newEntry = toNewPatient(req.body)
    // const { name, dateOfBirth, ssn, gender, occupation } = req.body
    const newPatient = patientService.addEntry(newEntry)
    res.json(newPatient)
})

export default router