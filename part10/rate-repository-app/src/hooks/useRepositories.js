import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortMethod) => {
  let variables = {};
  switch (sortMethod) {
    case 'highest': {
      variables = {
        input_by: 'RATING_AVERAGE',
        input_dir: 'DESC',
      };
      break;
    }
    case 'lowest': {
      variables = {
        input_by: 'RATING_AVERAGE',
        input_dir: 'ASC',
      };
      break;
    }
    default: {
      variables = {
        input_by: 'CREATED_AT',
        input_dir: 'DESC',
      };
    }
  }

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const repositories = data && data.repositories ? data.repositories : [];
  console.log(repositories);

  return { repositories, loading, error };
};

export default useRepositories;
