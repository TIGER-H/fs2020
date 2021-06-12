import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (sortMethod, searchKeyword) => {
  let variables = {};
  switch (sortMethod) {
    case "highest": {
      variables = {
        input_by: "RATING_AVERAGE",
        input_dir: "DESC",
        input_search: searchKeyword,
        first: 5,
      };
      break;
    }
    case "lowest": {
      variables = {
        input_by: "RATING_AVERAGE",
        input_dir: "ASC",
        input_search: searchKeyword,
        first: 5,
      };
      break;
    }
    default: {
      variables = {
        input_by: "CREATED_AT",
        input_dir: "DESC",
        input_search: searchKeyword,
        first: 5,
      };
    }
  }

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    console.log("can fetch more!");

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  // const repositories = data && data.repositories ? data.repositories : [];

  // return { repositories, loading, error };
  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
