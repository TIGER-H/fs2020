import patientsData from '../data/patients.json'
import { PatientsToShow } from '../types'

const patients: PatientsToShow[] = patientsData

const getEntres = (): PatientsToShow[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation })
    )
}

const addEntry = () => {
    return null
}

export default {
    getEntres,
    addEntry
}