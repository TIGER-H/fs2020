import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Button, Container, Header, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { setPatient, setPatientUpdate, useStateValue } from '../state';
import { Patient } from '../types';
import { EntryDetails } from './PatientEntry';
import AddEntryModal from '../AddEntryModal/index';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientPage = () => {
    const [{ patient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                { ...values, type: "HealthCheck", healthCheckRating: values.healthCheckRating }
            );
            dispatch(setPatientUpdate(updatedPatient));
            closeModal();
        } catch (e) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
        }
    };

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
    }, [dispatch, modalOpen]);

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
            <div>{patient?.entries.map(entry =>
                <EntryDetails key={entry.id} entry={entry} />)
            }
            </div>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add a new health check entry</Button>
        </Container>
    );
};

export default PatientPage;