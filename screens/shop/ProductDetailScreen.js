import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    Platform,
    Animated,
    FlatList,
    TouchableOpacity,
    Modal
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';


const HEADER_MAX_HEIGHT = 500;
const HEADER_MIN_HEIGHT = 85;
const HEADER_SCROLL_DISTANCE = (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT);

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod._id === productId),
    );
    const dispatch = useDispatch();
    const scrollY = new Animated.Value(0);

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });
    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -50],
        extrapolate: 'clamp',
    });

    const images = selectedProduct.images.map(image => {
        return {
            url: image
        }
    });
    const [showModal, setShowModal] = React.useState(false);
    const [imageIndex, setImageIndex] = React.useState(0);
    const showImagePreview = (imageIndex) => {
      setShowModal(true);
      setImageIndex(imageIndex);
    };

        let productData = (
            <View style={styles.scrollViewContent}>
                <View style={{flex: 1, backgroundColor: 'white', minHeight: 800}}>
                    <View style={styles.topContainer}>
                        <View style={styles.details}>
                            <Text style={styles.brand}>
                                {selectedProduct.brandName}
                            </Text>
                            <Text style={styles.productName} numberOfLines={2}>
                                {selectedProduct.name}
                            </Text>
                        </View>
                        <View style={{ width: '30%' }}>
                            <Text style={styles.price}>
                                ৳ {selectedProduct.price.retail.toFixed(2)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={selectedProduct.images}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal={false}
                            numColumns={4}
                            renderItem={itemData => (
                                <TouchableOpacity style={styles.imageContainer} onPress={() => showImagePreview(itemData.index)}>
                                        <Image
                                            source={{ uri: itemData.item }}
                                            style={styles.imageThumbnail}
                                        />
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                    <Text style={styles.description}>
                        {selectedProduct.description}
                    </Text>
                    <View style={styles.actions}>
                        <Button
                            color={Colors.primary}
                            title="Add to Cart"
                            onPress={() => {
                                dispatch(cartActions.addToCart(selectedProduct));
                            }}
                        />
                    </View>
                </View>
            </View>
        );


        return (
            <View style={styles.fill}>
                <ScrollView
                    style={styles.fill}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollY}}}]
                    )}
                >
                    {productData}
                </ScrollView>
                <Animated.View style={[styles.header, {height: headerHeight}]}>
                        <Animated.Image
                            style={[
                                styles.backgroundImage,
                                {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
                            ]}
                            source={{ uri: selectedProduct.images[0] }}
                        />
                    <Animated.View>
                        <View style={styles.bar}>
                            <TouchableOpacity style={styles.close} onPress={() => props.navigation.goBack()}>
                                <Ionicons
                                    name={
                                        Platform.OS === 'android'
                                            ? 'md-arrow-dropleft-circle'
                                            : 'ios-arrow-dropleft-circle'
                                    }
                                    size={30}
                                    style={{ color: Colors.primary }}
                                />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                        <TouchableOpacity style={styles.addToCartBtn} onPress={() => dispatch(cartActions.addToCart(selectedProduct))}>
                            <Ionicons
                                style={{ color: Colors.primary }}
                                name={
                                    Platform.OS === 'android'
                                        ? 'md-basket'
                                        : 'ios-basket'
                                }
                                size={30}
                            />
                        </TouchableOpacity>

                </Animated.View>

                <Modal visible={showModal} transparent={true} >
                    <ImageViewer
                        imageUrls={images}
                        index={imageIndex}
                        backgroundColor="white"
                        enableSwipeDown={true}
                        onSwipeDown={() => setShowModal(false) }
                        pageAnimateTime={150}
                    />
                    <TouchableOpacity style={styles.closeImagePreview} onPress={() => {setShowModal(false) }}>
                        <Ionicons
                            name={
                                Platform.OS === 'android'
                                    ? 'md-close'
                                    : 'ios-close'
                            }
                            size={30}
                            style={{ color: '#333' }}
                        />
                    </TouchableOpacity>
                </Modal>
            </View>
        );

};

const styles = StyleSheet.create({
    fill: {
        flex: 1
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
    },
    bar: {
        marginTop: 28,
        height: 32,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },

    topContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 12
    },
    details: {
        alignItems: 'flex-start',
        paddingVertical: 12,
        width: '70%',
    },
    brand: {
        fontFamily: 'open-sans',
        fontSize: 18,
        // marginVertical: 2
    },
    productName: {
        fontFamily: 'open-sans',
        fontSize: 16,
        marginVertical: 2,
        color: '#888',
        fontWeight: '100',
    },
    price: {
        fontSize: 16,
        color: Colors.primary,
        textAlign: 'right',
        marginVertical: 30,
        fontFamily: 'open-sans-bold',
    },
    addToCartBtn: {
        position: 'absolute',
        bottom: 5,
        right: 15,
        width: 50,
        height: 50,
        padding: 5,
        backgroundColor: '#ffffff',
        borderRadius: 30,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatListContainer: {
        paddingHorizontal: 10
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 2,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 10
    },
    close: {
        margin: 5,
        position: 'absolute',
        top: 6,
        left: 30,
        width: 70,
        height: 70,
        color: '#333',
    },
    closeImagePreview: {
        position: 'absolute',
        top: 40,
        left: 40,
        width: 70,
        height: 70,
        padding: 2
    }
});

export default ProductDetailScreen;