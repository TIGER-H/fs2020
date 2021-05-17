import patientsData from '../data/patients.json'
import { newPatientEntry, Patients, PatientsToShow } from '../types'
import { v1 as uuid } from 'uuid'

const patients: PatientsToShow[] = patientsData

const getEntres = (): PatientsToShow[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation })
    )
}

const addEntry = (
    entry: newPatientEntry
): Patients => {   
    const id = uuid()
    const newEntry = {
        id,
        ...entry
    }
    patientsData.push(newEntry)
    return newEntry
}

export default {
    getEntres,
    addEntry
}