import React from 'react';
import {
    createStackNavigator,
    createDrawerNavigator,
    createBottomTabNavigator,
    createAppContainer,
} from 'react-navigation';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import SearchScreen from '../screens/shop/SearchScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
        textTransform: 'uppercase',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        // ProductDetail: ProductDetailScreen
    },
    {
        // navigationOptions: {
        //   drawerIcon: drawerConfig => (
        //     <Ionicons
        //       name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        //       size={23}
        //       color={drawerConfig.tintColor}
        //     />
        //   )
        // },
        defaultNavigationOptions: defaultNavOptions,
    },
);

const ModalStack = createStackNavigator(
    {
        Main: {
            screen: ProductsNavigator,
        },
        ProductDetail: {
            screen: ProductDetailScreen,
        },
    },
    {
        // mode: 'modal',
        headerMode: 'none',
    },
);

const OrdersNavigator = createStackNavigator(
    {
        Orders: OrdersScreen,
    },
    {
        // navigationOptions: {
        //   drawerIcon: drawerConfig => (
        //     <Ionicons
        //       name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
        //       size={23}
        //       color={drawerConfig.tintColor}
        //     />
        //   )
        // },
        defaultNavigationOptions: defaultNavOptions,
    },
);

const CartNavigator = createStackNavigator(
    {
        Cart: CartScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
    },
);

const SearchNavigator = createStackNavigator(
    {
        Search: SearchScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
    },
);

// const AdminNavigator = createStackNavigator(
//     {
//       UserProducts: UserProductsScreen,
//       EditProduct: EditProductScreen
//     },
//     {
//       navigationOptions: {
//         drawerIcon: drawerConfig => (
//           <Ionicons
//             name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//             size={23}
//             color={drawerConfig.tintColor}
//           />
//         )
//       },
//       defaultNavigationOptions: defaultNavOptions
//     }
//   );

// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary
//     }
//   }
// );

const ShopTabNavigator = createBottomTabNavigator(
    {
        Products: {
            screen: ModalStack,
            navigationOptions: {
                tabBarIcon: tabInfo => {
                    return (
                        <Ionicons
                            name={
                                Platform.OS === 'android'
                                    ? 'md-home'
                                    : 'ios-home'
                            }
                            size={24}
                            color={tabInfo.tintColor}
                        />
                    );
                },
            },
        },
        Search: {
            screen: SearchNavigator,
            navigationOptions: {
                tabBarIcon: tabInfo => {
                    return (
                        <Ionicons
                            name={
                                Platform.OS === 'android'
                                    ? 'md-search'
                                    : 'ios-search'
                            }
                            size={24}
                            color={tabInfo.tintColor}
                        />
                    );
                },
            },
        },
        Cart: {
            screen: CartNavigator,
            navigationOptions: {
                tabBarIcon: tabInfo => {
                    return (
                        <Ionicons
                            name={
                                Platform.OS === 'android'
                                    ? 'md-cart'
                                    : 'ios-cart'
                            }
                            size={24}
                            color={tabInfo.tintColor}
                        />
                    );
                },
            },
        },
        Orders: {
            screen: OrdersNavigator,
            navigationOptions: {
                tabBarIcon: tabInfo => {
                    return (
                        <Ionicons
                            name={
                                Platform.OS === 'android'
                                    ? 'md-person'
                                    : 'ios-person'
                            }
                            size={24}
                            color={tabInfo.tintColor}
                        />
                    );
                },
            },
        },
    },
    {
        tabBarOptions: {
            activeTintColor: Colors.primary,
            showLabel: false,
        },
    },
);

export default createAppContainer(ShopTabNavigator);
