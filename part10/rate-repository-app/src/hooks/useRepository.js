import { useQuery } from "@apollo/client";
import { GET_REPO } from "../graphql/queries";

const useRepository = (id) => {
  let variables = { id, first: 5 };
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPO, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    console.log("can fetch more!");

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepository;
