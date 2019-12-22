import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import Card from '../UI/Card';
import Colors from "../../constants/Colors";

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    // <Card style={styles.product}>
      <View style={styles.product}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.brand}>Esprit</Text>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>৳ {props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              {props.children}
            </View>
          </View>
        </TouchableCmp>
      </View>
    // </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    width: '46%',
    height: 350,
    margin: '2%'
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '70%',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'flex-start',
    height: '17%',
    padding: 10
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: 16,
    marginVertical: 2,
    color: '#888',
    fontWeight: "100"
  },
  brand: {
    fontFamily: 'open-sans',
    fontSize: 18,
    marginVertical: 2
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: Colors.primary
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '13%',
    paddingHorizontal: 20
  }
});

export default ProductItem;
