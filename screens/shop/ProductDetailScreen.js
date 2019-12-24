import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    ImageBackground,
    Button,
    StyleSheet,
    Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod._id === productId),
    );
    const dispatch = useDispatch();

    return (
        <ScrollView>
            {/*<Image style={styles.image} source={{ uri: selectedProduct.images[0] }} resizeMethod='auto' />*/}
            <ImageBackground
                style={styles.image}
                source={{ uri: selectedProduct.images[0] }}
                resizeMethod="auto"
            >
                <Ionicons
                    style={styles.close}
                    name={
                        Platform.OS === 'android'
                            ? 'md-close-circle'
                            : 'ios-close-circle'
                    }
                    size={30}
                    onPress={() => props.navigation.goBack()}
                />
            </ImageBackground>
            <View style={styles.details}>
                <Text style={styles.brand}>Esprit</Text>
                <Text style={styles.title} numberOfLines={1}>{selectedProduct.name}</Text>
            </View>
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title="Add to Cart"
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct));
                    }}
                />
            </View>
            <Text style={styles.price}>
                ৳ {selectedProduct.price.retail.toFixed(2)}
            </Text>
            <Text style={styles.description}>
                {selectedProduct.description}
            </Text>
        </ScrollView>
    );
};

// ProductDetailScreen.navigationOptions = navData => {
//   return {
//     headerTitle: navData.navigation.getParam('productTitle'),
//   };
// };

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 500
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold',
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
    },
    close: {
        margin: 5,
        position: 'absolute',
        top: 35,
        left: 30,
        width: 70,
        height: 70,
        color: '#333',
    },
});

export default ProductDetailScreen;
