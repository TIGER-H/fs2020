import { BaseEntry, Diagnose, Entry, Gender, HealthCheckRating, newPatientEntry } from './types';
import { v1 as uuid } from 'uuid'

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// 验证字符串有特定的形式
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const isHealthcheckRating = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating)
}

const parseString = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing field parseString: ${text}`);
    }
    return text;
};

const parseGender = (gender: unknown): string => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing field parseGender: ${gender}`);
    }
    return gender;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnose['code']> => {
    if (!Array.isArray(codes)) {
        throw new Error(`Incorrect or missing field parseDiagnosisCodes: ${codes}`)
    }
    return codes.map(code => parseString(code))
}

const parseHealthcheckRating = (rating: any): HealthCheckRating => {
    const ratingNumber: Number = parseInt(rating); 
    if (ratingNumber === undefined || !isHealthcheckRating(ratingNumber)) { //rating can be 0 => healthy
        throw new Error(`Incorrect or missing field parseHealthcheckRating: ${rating}`)
    }
    return rating;
}

export const toNewPatient = (object: any): newPatientEntry => {
    const newPatient: newPatientEntry = {
        name: parseString(object.name),
        dateOfBirth: parseString(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: []
    };
    return newPatient;
};

export const toNewEntry = (object: any): Entry => {
    const newEntry: BaseEntry = {
        id: uuid(),
        description: parseString(object.description),
        date: parseString(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: object.diagnosisCodes ? parseDiagnosisCodes(object.diagnosisCodes) : []
    }
    switch (object.type) {
        case "HealthCheck": {
            return {
                ...newEntry,
                type: "HealthCheck",
                healthCheckRating: parseHealthcheckRating(object.healthCheckRating)
            }
        }
        case "Hospital": {
            return {
                ...newEntry,
                type: "Hospital",
                discharge: {
                    date: parseString(object.discharge.date),
                    criteria: parseString(object.discharge.criteria)
                }
            }
        }
        case "OccupationalHealthcare":
            let entry: Entry = {
                ...newEntry,
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName),
            }
            if (object.sickLeave) {
                entry = {
                    ...entry,
                    sickLeave: {
                        startDate: parseString(object.sickLeave.startDate),
                        endDate: parseString(object.sickLeave.endDate)
                    }
                }
            }
            return entry
        default:
            throw new Error('entry invalid!')
    }
}

