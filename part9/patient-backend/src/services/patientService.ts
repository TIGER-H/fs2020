import patientsData from '../data/patients.json';
import { newPatientEntry, Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patientsPublic: PublicPatient[] = patientsData;

const getEntries = (): PublicPatient[] => {
    return patientsPublic.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation })
    );
};

const getEntry = (id: string): PublicPatient | undefined => {
    const foundPatient = patientsPublic.find(patient => patient.id === id);
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