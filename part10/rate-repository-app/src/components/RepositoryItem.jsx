import React from "react";
import { Image, StyleSheet, View } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
  },

  author: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
  },

  authorText: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },

  text: {
    flexWrap: "wrap",
    marginTop: 10,
  },
});

const UserAvatar = ({ url }) => {
  const imageStyles = StyleSheet.create({
    image: {
      width: 50,
      height: 50,
      margin: 12,
      borderRadius: 10,
    },
  });
  return <Image source={url} style={imageStyles.image} />;
};

const LangTag = ({ lang }) => {
  const languageTagStyles = StyleSheet.create({
    languageTag: {
      backgroundColor: theme.colors.primary,
      padding: 6,
      borderRadius: 5,
      color: "white",
      marginTop: 10,
    },
  });
  return <Text style={languageTagStyles.languageTag}>{lang}</Text>;
};

const DetailItem = ({ count, label }) => {
  const detailItemStyles = StyleSheet.create({
    count: { display: "flex", justifyContent: "space-around" },
    label: { display: "flex", justifyContent: "space-around", marginTop: 6 },
  });

  let countCopy = count;
  if (count >= 1000) {
    countCopy = `${Number(Math.round(count / 1000 + "e1") + "e-1")}k`;
  }

  return (
    <View>
      <Text fontWeight="bold" style={detailItemStyles.count}>
        {countCopy}
      </Text>
      <Text style={detailItemStyles.label} color="textSecondary">
        {label}
      </Text>
    </View>
  );
};

const Detail = ({
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
}) => {
  const detailStyles = StyleSheet.create({
    detail: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      margin: 10,
    },
  });

  return (
    <View style={detailStyles.detail}>
      <DetailItem count={stargazersCount} label={"Stars"} />
      <DetailItem count={forksCount} label={"Forks"} />
      <DetailItem count={reviewCount} label={"Reviews"} />
      <DetailItem count={ratingAverage} label={"Rating"} />
    </View>
  );
};

const RepositoryListItem = ({ item }) => {
  return (
    <View>
      <View style={styles.author}>
        <UserAvatar url={item.ownerAvatarUrl} />
        <View style={styles.authorText}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
            {item.fullName}
          </Text>
          <Text style={styles.text} color="textSecondary">
            {item.description}
          </Text>
          <LangTag lang={item.language} />
        </View>
      </View>
      <Detail
        stargazersCount={item.stargazersCount}
        forksCount={item.forksCount}
        reviewCount={item.reviewCount}
        ratingAverage={item.ratingAverage}
      />
    </View>
  );
};

export default RepositoryListItem;
