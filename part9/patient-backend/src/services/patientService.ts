import patientsData from '../data/patients';
import { Entry, newPatientEntry, Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

let patientsPublic: PublicPatient[] = patientsData;
let patients: Patient[] = patientsData

const getPatients = (): PublicPatient[] => {
    return patientsPublic.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation })
    );
};

const getPatient = (id: string): Patient => {
    const foundPatient = patients.find(patient => patient.id === id);
    if (!foundPatient) throw new Error('invalid id');
    return foundPatient;
};

const addPatient = (
    entry: newPatientEntry
): Patient => {
    const id = uuid();
    const newEntry = {
        id,
        ...entry
    };
    patients.push(newEntry);
    return newEntry;
};

const getEntry = (id: string): Entry[] => {
    const foundPatient = patients.find(patient => patient.id === id);
    if (!foundPatient) throw new Error('invalid id');
    return foundPatient.entries;
}

const addEntry = (
    id: string, entry: Entry
): Patient => {
    const patient = getPatient(id)
    const updatedPatient = {
        ...patient,
        entries: [...patient?.entries, entry]
    }
    patients = patients.map(p => p.id === id ? updatedPatient : p)
    return updatedPatient
}

export default {
    getPatient,
    addPatient,
    getPatients,
    addEntry,
    getEntry
};