import { Formik, useField } from "formik";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";

import Text from "./Text";
import useSignIn from "../hooks/useSignIn";
import { useHistory } from "react-router";

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingHorizontal: 20,
  },
  submit: {
    marginVertical: 5,
    height: 50,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.colors.appBarText,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        testID="usernameField"
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        testID="passwordField"
        secureTextEntry
      />
      <Pressable onPress={onSubmit} style={styles.submit} testID="submitButton">
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  let history = useHistory();
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      // console.log(result.data); //1.undefined 2.authorize
      history.push("/");
    } catch (e) {
      console.log("error occured when signing in", e);
    }
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
