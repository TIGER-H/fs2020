import React from 'react';
import { Text, View } from 'react-native';
const RepositoryListItem = ({ item }) => {
    return (
        <View>
            <Text>full name: {item.fullName}</Text>
            <Text>description: {item.description}</Text>
            <Text>language: {item.language}</Text>
            <Text>stars: {item.stargazersCount}</Text>
            <Text>forks: {item.forksCount}</Text>
            <Text>reviews: {item.reviewCount}</Text>
            <Text>rating: {item.ratingAverage}</Text>
        </View>
    );
};

export default RepositoryListItem;