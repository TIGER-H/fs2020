import patientsData from '../data/patients';
import { newPatientEntry, Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patientsPublic: PublicPatient[] = patientsData;
const patients: Patient[] = patientsData

const getEntries = (): PublicPatient[] => {
    return patientsPublic.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation })
    );
};

const getEntry = (id: string): Patient | undefined => {
    const foundPatient = patients.find(patient => patient.id === id);
    if (!foundPatient) throw new Error('not found');
    return foundPatient;
};

const addEntry = (
    entry: newPatientEntry
): Patient => {
    const id = uuid();
    const newEntry = {
        id,
        ...entry
    };
    patientsData.push(newEntry);
    return newEntry;
};

export default {
    getEntries,
    addEntry,
    getEntry
};