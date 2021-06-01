import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBarBackground,
        flexDirection:'row'
    },
    text: {
        color: theme.colors.appBarText,
        padding: 14,
    }
    // ...
});

const AppBar = () => {
    return <View style={styles.container}>
        <AppBarTab name={"repositories"} />
    </View>;
};

export default AppBar;