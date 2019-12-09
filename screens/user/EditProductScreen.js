import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    Platform,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productActions from "../../store/actions/products";

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId),
    );

    const dispatch = useDispatch();

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [titleIsValid, setTitleIsValid] = useState(false);
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const submitHandler = useCallback(() => {
        console.log('Submitting');
        if (editedProduct) {
            dispatch(productActions.updateProduct(prodId, title, description, imageUrl))
        } else {
            dispatch(productActions.createProduct(title, imageUrl, +price, description));
        }
        props.navigation.goBack();
    }, [dispatch, title, imageUrl, prodId, description, price]);

    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler });
    }, [submitHandler]);

    const titleChangeHandler = text => {
        if (text.trim().length === 0) {
            setTitleIsValid(false);
        } else {
            setTitleIsValid(true);
        }
        setTitle(text);
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={(val) => titleChangeHandler(val)}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onEndEditing={() => console.log('onEndEditing')}
                    />
                    {!titleIsValid ? <Text>Please enter text</Text> : null}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>ImageUrl</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={val => setImageUrl(val)}
                    />
                </View>
                {
                    !editedProduct ? <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={val => setPrice(val)}
                            keyboardType={"decimal-pad"}
                        />
                    </View> : null
                }

                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={val => setDescription(val)}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
});

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={
                        Platform.OS === 'android'
                            ? 'md-checkmark'
                            : 'ios-checkmark'
                    }
                    onPress={submitFn}
                />
            </HeaderButtons>
        ),
    };
};

export default EditProductScreen;
