import { useQuery } from '@apollo/client';
import { GET_REPO } from '../graphql/queries';

const useRepository = (id) => {
  const { data, error, loading } = useQuery(GET_REPO, {
    fetchPolicy: 'cache-and-network',
    variables: { id: id },
  });

  return { data, loading, error };
};

export default useRepository;
