import { FlatList, StyleSheet } from "react-native";
import { useHistory } from "react-router";
import useUser from "../hooks/useUser";
import ReviewItem from "./ReviewItem";
import React from "react";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Reviews = () => {
  const history = useHistory();
  const { authorizedUser, loading, fetchMore } = useUser();
  if (loading) return <Text>loading</Text>;

  const onEndReach = () => {
    console.log(`you've reached the end!`);
    fetchMore();
  };

  return (
    <FlatList
      data={authorizedUser.reviews.edges}
      keyExtractor={(item) => item.node.id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Reviews;
