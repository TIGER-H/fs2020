import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, TypeOption, SelectField } from "../AddPatientModal/FormField";
import { EntryForm, EntryType, HealthCheckRating } from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */

export type EntryFormValues = EntryForm;


const ratingOptions: TypeOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

const typeOptions: TypeOption[] = [
  { value: EntryType.HealthCheck, label: EntryType.HealthCheck },
  { value: EntryType.Hospital, label: EntryType.Hospital },
  {
    value: EntryType.OccupationalHealthcare,
    label: EntryType.OccupationalHealthcare,
  },
];


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  patientId: string;
}

const conditionalFields = (type: string) => {
  switch (type) {
    case "HealthCheck":
      return (
        <SelectField
          label="Rating"
          name="healthCheckRating"
          options={ratingOptions}
        />
      );
    case "Hospital":
      return (
        <div>
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge Criteria"
            name="discharge.criteria"
            placeholder="Discharge Criteria"
            component={TextField}
          />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <Field
            label="EmployerName"
            name="employerName"
            placeholder="Employer Name"
            component={TextField}
          />
          <Field
            label="Sick Leave Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Sick Leave End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </div>
      );
    default:
      return null;
  }
};

export const AddPatientForm = ({ onSubmit, onCancel, patientId }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        id: patientId,
        description: "",
        date: "",
        specialist: "",
        type: "HealthCheck",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        discharge: {
          date: "",
          criteria: ""
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        // if (values.type === "Hospital") {
        //   if (!values.discharge?.date || !values.discharge?.criteria) {
        //     errors.discharge = requiredError;
        //   }
        // }
        // if (values.type === "OccupationalHealthcare") {
        //   if (!values.employerName)
        //     errors.employerName = requiredError;
        //   if (!values.sickLeave?.endDate || !values.sickLeave.startDate) {
        //     errors.sickLeave = requiredError;
        //   }
        // }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <SelectField label="Types" name="type" options={typeOptions} />

            {conditionalFields(values.type)}

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientForm;
