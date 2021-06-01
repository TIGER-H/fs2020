import React from 'react';
import { Pressable, StyleSheet, Text } from "react-native";
import theme from '../theme';

const styles = StyleSheet.create({
    text: {
        color: theme.colors.appBarText,
        padding: 14,
        fontSize: 20
    }
});

const AppBarTab = ({ name }) => {
    return (
        <Pressable>
            <Text style={styles.text}>{name}</Text>
        </Pressable>
    );
};

export default AppBarTab;