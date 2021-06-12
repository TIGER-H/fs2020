import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useParams } from "react-router";
import useRepository from "../hooks/useRepository";
import theme from "../theme";
import RepositoryListItem from "./RepositoryItem";
import Text from "./Text";
// import * as WebBrowser from 'expo-web-browser';
import * as Linking from "expo-linking";
import { format } from "date-fns";

const styles = StyleSheet.create({
  submit: {
    margin: 10,
    height: 50,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: theme.colors.appBarText,
  },
  separator: {
    height: 10,
    backgroundColor: "white",
  },

  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },

  reviewContainer: {
    flex: 1,
    display: "flex",
    marginLeft: 10,
  },

  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  // Single review item
  const dateFormat = (date) => {
    return format(new Date(date), "dd.MM.yyyy");
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text fontWeight="bold" color="primary">
          {review.node.rating}
        </Text>
      </View>
      <View style={styles.reviewContainer}>
        <Text fontWeight="bold">{review.node.user.username}</Text>
        <Text>{dateFormat(review.node.createdAt)}</Text>
        <Text>{review.node.text}</Text>
      </View>
    </View>
  );
};

const Repository = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository(id);
  if (loading) return <Text>waiting for loading</Text>;
  // console.log(data.repository.reviews.edges[0].node.id);

  const onEndReach = () => {
    console.log(`you've reached the end!`);
    fetchMore();
  };

  const onPress = () => {
    Linking.openURL(data.repository.url);
    // WebBrowser.openBrowserAsync(data.repository.url);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={repository.reviews.edges}
        // ...
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        ListHeaderComponent={() => (
          <View>
            <RepositoryListItem item={repository} />
            <Pressable onPress={onPress} style={styles.submit}>
              <Text style={styles.text}>Open in Github</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.node.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Repository;
