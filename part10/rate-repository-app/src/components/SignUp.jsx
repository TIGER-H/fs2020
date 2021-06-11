import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import useSignUp from '../hooks/useSignUp';
import { Formik } from 'formik';
import React from 'react';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    marginTop: 5,
    paddingHorizontal: 20,
  },
  submitbutton: {
    marginVertical: 5,
    height: 50,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export const SignUpForm = ({ onsubmit }) => {
  return (
    <View style={styles.input}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <FormikTextInput
        name='passwordConfirmation'
        placeholder='Password Confirmation'
        secureTextEntry
      />
      <Pressable onPress={onsubmit} style={styles.submitbutton}>
        <Text style={styles.text}>Sign Up Now!</Text>
      </Pressable>
    </View>
  );
};

// 用户名是必填的字符串，长度在1-30之间
// 密码是必填的字符串，长度在5-50之间
// 密码确认必须与密码相同
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, '用户名长度在1-30之间')
    .max(30, '用户名长度在1-30之间')
    .required('Username is required.'),
  password: yup
    .string()
    .min(5, '用户密码长度在5-30之间')
    .max(50, '用户密码长度在5-30之间')
    .required('Password is required.'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], '密码确认必须与密码相同')
    .required('Password confirm is required'),
});

const SignUp = () => {
  const history = useHistory();
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      history.push('/signin');
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onsubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
