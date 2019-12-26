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
    Animated,
    FlatList
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
                            ? 'md-arrow-dropleft-circle'
                            : 'ios-arrow-dropleft-circle'
                    }
                    size={30}
                    onPress={() => props.navigation.goBack()}
                />
                <View style={styles.addToCartBtn}>
                    <Ionicons
                        style={{color: '#ffffff'}}
                        name={
                            Platform.OS === 'android'
                                ? 'md-basket'
                                : 'ios-basket'
                        }
                        size={30}
                        onPress={() => {
                            dispatch(cartActions.addToCart(selectedProduct));
                        }}
                    />
                </View>
            </ImageBackground>
            <View style={styles.topContainer}>
                <View style={styles.details}>
                    <Text style={styles.brand}>{selectedProduct.brandName}</Text>
                    <Text style={styles.title} numberOfLines={2}>{selectedProduct.name}</Text>

                </View>
                <View style={{width: '30%'}}>
                    <Text style={styles.price}> ৳ {selectedProduct.price.retail.toFixed(2)}</Text>
                </View>
            </View>

            {/*<View style={styles.actions}>*/}
            {/*    <Button*/}
            {/*        color={Colors.primary}*/}
            {/*        title="Add to Cart"*/}
            {/*        onPress={() => {*/}
            {/*            dispatch(cartActions.addToCart(selectedProduct));*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</View>*/}
                <FlatList
                    data={selectedProduct.images}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={false}
                    numColumns={4}
                    renderItem={itemData => (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: itemData.item }} style={styles.imageThumbnail} />
                        </View>
                    )}
                />



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
        height: 600
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 2,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        // overflow: 'hidden'
    },
    imageThumbnail: {
        // width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        color: Colors.primary,
        textAlign: 'center',
        marginVertical: 30,
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
        left: 20,
        width: 70,
        height: 70,
        color: '#333',
    },
    addToCartBtn: {
        position: 'absolute',
        bottom: -15,
        right: 15,
        width: 50,
        height: 50,
        padding: 5,
        backgroundColor: Colors.accent,
        borderRadius: 30,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topContainer: {
      flexDirection: 'row',
        width: '100%'
    },
    details: {
        alignItems: 'flex-start',
        padding: 10,
        width: '70%'
    },
    title: {
        fontFamily: 'open-sans',
        fontSize: 16,
        marginVertical: 2,
        color: '#888',
        fontWeight: '100'
    },
    brand: {
        fontFamily: 'open-sans',
        fontSize: 18,
        // marginVertical: 2
    },
});

export default ProductDetailScreen;
