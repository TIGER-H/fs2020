import express from 'express'
import patientService from '../services/patientService'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(patientService.getEntres())
})

router.post('/', (_req, res) => {
    res.send('saving patient.')
})

export default router