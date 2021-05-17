import { Gender, newPatientEntry } from './types'

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

// 验证字符串有特定的形式
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender)
}

const parseString = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing field ${text}`)
    }
    return text
}

const parseGender = (gender: unknown): string => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing field ${gender}`)
    }
    return gender
}

export const toNewPatient = (object: any): newPatientEntry => {
    const newPatient: newPatientEntry = {
        name: parseString(object.name),
        dateOfBirth: parseString(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation)
    }
    return newPatient
}

