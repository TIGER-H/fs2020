import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Header, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';

export const PatientPage = () => {
    const [{ patient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    // console.log(patient, patients); // null => initialState

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: pinfo } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch({ type: "SET_PATIENT", payload: pinfo });
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
        </Container>
    );
};
