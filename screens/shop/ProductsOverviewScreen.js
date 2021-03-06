import React, { useEffect } from 'react';
import { FlatList, Button, Platform, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.fetchProducts());
    }, [dispatch]);

    const selectItemHandler = id => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={item => item._id}
                horizontal={false}
                numColumns={2}
                renderItem={itemData => (
                    <ProductItem
                        image={itemData.item.images[0]}
                        title={itemData.item.name}
                        price={itemData.item.price.retail}
                        brand={itemData.item.brandName}
                        onSelect={() => {
                            selectItemHandler(itemData.item._id);
                        }}
                    >
                        {/*<Button*/}
                        {/*  color={Colors.primary}*/}
                        {/*  title="View Details"*/}
                        {/*  onPress={() => {*/}
                        {/*    selectItemHandler(itemData.item.id, itemData.item.title);*/}
                        {/*  }}*/}
                        {/*/>*/}
                        {/*<Button*/}
                        {/*  color={Colors.primary}*/}
                        {/*  title="To Cart"*/}
                        {/*  onPress={() => {*/}
                        {/*    dispatch(cartActions.addToCart(itemData.item));*/}
                        {/*  }}*/}
                        {/*/>*/}
                    </ProductItem>
                )}
            />
        </View>

    );
};

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        // headerLeft: (
        //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //     <Item
        //       title="Menu"
        //       iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        //       onPress={() => {
        //         navData.navigation.toggleDrawer();
        //       }}
        //     />
        //   </HeaderButtons>
        // ),
        // headerRight: (
        //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //     <Item
        //       title="Cart"
        //       iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        //       onPress={() => {
        //         navData.navigation.navigate('Cart');
        //       }}
        //     />
        //   </HeaderButtons>
        // )
    };
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 4,
        paddingVertical: 8
    }
});

export default ProductsOverviewScreen;
