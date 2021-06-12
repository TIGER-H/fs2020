import { useApolloClient, useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const client = useApolloClient();

  const deleteReview = async (id) => {
    const response = await mutate({ variables: { id } });
    client.resetStore();
    return response;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
