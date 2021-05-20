import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Header, Icon, List } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { setPatient, useStateValue } from '../state';
import { Patient } from '../types';

export const PatientPage = () => {
    const [{ patient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    // console.log(patient, patients); // null => initialState

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(setPatient(patientFromApi));
                // dispatch({ type: "SET_PATIENT", payload: patientFromApi });
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatient();
    }, [dispatch]);

    return (
        <Container>
            <Header as="h2" >
                <Header.Content>
                    {patient?.name}
                    {patient?.gender === 'male' ? <Icon name='man' size='big' /> : <Icon name='woman' size='big' />}
                </Header.Content>
            </Header>
            <p>ssn:{patient?.ssn}</p>
            <p>occupation:{patient?.occupation}</p>
            <Header as='h3'>entries</Header>
            <div>{patient?.entries.map(entry => <div key={entry.id}>
                <span key={entry.id}>{entry.date} {entry.description}</span>
                <div>
                    {entry.diagnosisCodes?.map((code, index) => <List.Item as='li' key={index} >{code}</List.Item>)}
                </div>
            </div>)}
            </div>
        </Container>
    );
};
