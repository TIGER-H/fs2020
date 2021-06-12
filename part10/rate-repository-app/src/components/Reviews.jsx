import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useHistory } from "react-router";
import useUser from "../hooks/useUser";
import ReviewItem from "./ReviewItem";
import React from "react";
import Text from "./Text";
import useDeleteReview from "../hooks/useDeleteReview";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "white",
  },
  submitred: {
    margin: 10,
    height: 50,
    padding: 20,
    borderRadius: 5,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    margin: 10,
    height: 50,
    padding: 20,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: theme.colors.appBarText,
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

  const ReviewActions = ({ review }) => {
    const [deleteReview] = useDeleteReview();

    const createTwoButtonAlert = () =>
      Alert.alert("Delete review", "R U Sure??", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteReview(review.node.id) },
      ]);

    return (
      <View>
        <ReviewItem review={review} />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Pressable
            onPress={() => history.push(`/repo/${review.node.repository.id}`)}
            style={styles.submit}
          >
            <Text style={styles.text}>View repository</Text>
          </Pressable>
          <Pressable
            onPress={
              Platform.OS === "web"
                ? () => {
                    if (confirm("Are you sure to delete?"))
                      deleteReview(review.node.id);
                  }
                : createTwoButtonAlert
            }
            style={styles.submitred}
          >
            <Text style={styles.text}>Delete review</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "#eee" }}>
      <FlatList
        data={authorizedUser.reviews.edges}
        keyExtractor={(item) => item.node.id}
        renderItem={({ item }) => <ReviewActions review={item} />}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Reviews;
