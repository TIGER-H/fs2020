import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text";
import { format } from "date-fns";
import theme from "../theme";

const styles = StyleSheet.create({
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

export default ReviewItem;
