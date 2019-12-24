import React, { useEffect } from 'react';
import { FlatList, Button, Platform, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import OrdersScreen from './OrdersScreen';

const SearchScreen = () => {
    return <Text>Search screen</Text>;
};

SearchScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Search',
    };
};

export default SearchScreen;
