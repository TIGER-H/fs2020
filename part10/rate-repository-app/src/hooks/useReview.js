import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const client = useApolloClient();

  const createReview = async (repoName, ownerName, rating, text) => {
    const params = { repoName, ownerName, rating, text };
    console.log(params);
    const response = await mutate({
      variables: {
        input: {
          repositoryName: repoName,
          ownerName: ownerName,
          rating: parseInt(rating),
          text: text,
        },
      },
    });
    console.log(response);
    client.resetStore();
    return response;
  };
  return [createReview, result];
};

export default useReview;
