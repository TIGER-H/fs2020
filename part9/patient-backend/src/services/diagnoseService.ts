import diagnosesData from '../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosesData;

const getEntres = ():Array<Diagnose> => { 
    return diagnoses;
};

const addEntry = () => {
    return null;
};

export default {
    getEntres,
    addEntry
};