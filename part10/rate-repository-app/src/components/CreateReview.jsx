import { Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router';
import useReview from '../hooks/useReview';
import * as yup from 'yup';
import { Button, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
  textbox: {
    marginTop: 5,
    paddingHorizontal: 20,
  },
});

export const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.textbox}>
      <FormikTextInput name='repoName' placeholder='Repository Name' />
      <FormikTextInput name='repoOwner' placeholder='Repository owner name' />
      <FormikTextInput name='rating' placeholder='0-100' />
      <FormikTextInput name='text' placeholder='Your review here' multiline />
      <View style={{ marginTop: 20 }}>
        <Button title='Create a Review' onPress={onSubmit} />
      </View>
    </View>
  );
};

// 仓库的拥有者用户名是必填字符串
// 仓库的名称是必填的字符串
// 投票是0-100的必填数值
// 评论是可选的字符串
const validationSchema = yup.object().shape({
  repoName: yup.string().required('Repository name is required'),
  repoOwner: yup.string().required('Repository owner name is required'),
  rating: yup
    .number()
    .min(0, '0-100')
    .max(100, '0-100')
    .required('Rating is required'),
});

const CreateReview = () => {
  const [CreateReview] = useReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { repoName, repoOwner, rating, text } = values;
    console.log('values: ', values);

    try {
      const result = await CreateReview(repoName, repoOwner, rating, text);
      history.push(`/repo/${result.data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const initialValues = {
    repoName: '',
    repoOwner: '',
    rating: '',
    text: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
