import React, { FC } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from '../types';

interface EntryData {
    entry: Entry
}

const healthCheckRatingColor = (rating: HealthCheckRating) => {
    switch (rating) {
        case 0:
            return <Icon name='heart' color='green' />;
        case 1:
            return <Icon name='heart' color='orange' />;
        case 2:
            return <Icon name='heart' color='yellow' />;
        case 3:
            return <Icon name='heart' color='red' />;
        default:
            return null;
    }
};

const Hospital: FC<{ entry: HospitalEntry }> = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date} <Icon name='user md' />
                </Card.Header>
                <Card.Meta>
                    {entry.description}
                </Card.Meta>
                <Card.Description>
                    {entry.diagnosisCodes ?
                        <ul>
                            {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code] ? diagnoses[code].name : null}</li>)}
                        </ul>
                        : null}
                </Card.Description>
            </Card.Content>
        </Card>
    );

};

const HealthCheck: FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date}  <Icon name='user md' />
                </Card.Header>
                <Card.Meta>
                    {entry.description}
                </Card.Meta>
                <Card.Description>
                    {entry.diagnosisCodes ?
                        <ul>
                            {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code] ? diagnoses[code].name : null}</li>)}
                        </ul>
                        : null}
                    {healthCheckRatingColor(entry.healthCheckRating)}
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

const OccupationalHealthcare: FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name='stethoscope' />
                </Card.Header>
                <Card.Meta>
                    {entry.description}
                </Card.Meta>
                <Card.Description>
                    {entry.diagnosisCodes ?
                        <ul>
                            {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code] ? diagnoses[code].name : null}</li>)}
                        </ul>
                        : null}
                </Card.Description>
            </Card.Content>
        </Card>
    );

};

const assertNever = (val: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(val)}`
    );
};

export const EntryDetails: React.FC<EntryData> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <Hospital entry={entry} />;
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} />;
        default:
            return assertNever(entry);
    }
};