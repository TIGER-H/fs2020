import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "../graphql/queries";

const useUser = () => {
  //   let variables = { first: 5, includeReviews: true };
  const { data, loading, fetchMore, ...result } = useQuery(GET_AUTH_USER, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
      first: 5,
    },
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    console.log("can fetch more!");

    fetchMore({
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  return {
    authorizedUser: data?.authorizedUser,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useUser;
