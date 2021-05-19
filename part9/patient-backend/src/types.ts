export interface Diagnose {
    code: string
    name: string
    latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {

}

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: string
    occupation: string
    entries: Entry[]
}

export type PatientsToShow = Omit<Patient, "ssn">;

export type newPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;