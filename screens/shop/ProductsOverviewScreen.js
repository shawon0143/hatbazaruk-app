import React from 'react';
import {FlatList, Text, Platform, Button, View} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);

  const dispatch = useDispatch();

  const onSelectProduct = (id, title) => {
      props.navigation.navigate('ProductDetail', {
          productId: id,
          productTitle: title,
      });
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      horizontal={false}
      numColumns={2}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            onSelectProduct(itemData.item.id, itemData.item.title)
          }}
        >
            <Button
                color={Colors.primary}
                title="View Details"
                onPress={() => onSelectProduct(itemData.item.id, itemData.item.title)}
            />
            <Button
                color={Colors.primary}
                title="To Cart"
                onPress={() => {dispatch(cartActions.addToCart(itemData.item))}}
            />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
   return {
      headerTitle: 'All Products',
      headerLeft: (
         <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
               title="Menu"
               iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
               onPress={() => {
                  navData.navigation.toggleDrawer();
               }}
            />
         </HeaderButtons>
      ),
      headerRight: (
         <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
               title="Cart"
               iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
               onPress={() => {
                  navData.navigation.navigate('Cart');
               }}
            />
         </HeaderButtons>
      )
   };
};

export default ProductsOverviewScreen;
