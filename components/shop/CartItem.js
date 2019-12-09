import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from "../../constants/Colors";

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
         {/*<TouchableOpacity onPress={props.addQuantity} style={styles.quantityButton}>*/}
         {/*   <Ionicons*/}
         {/*      name={Platform.OS === 'android' ? 'md-add-circle' : 'ios-add-circle'}*/}
         {/*      size={23}*/}
         {/*      color={Colors.accent}*/}
         {/*   />*/}
         {/*</TouchableOpacity>*/}
         <Text style={styles.quantity}>{props.quantity}</Text>
         {/*<TouchableOpacity onPress={props.removeQuantity} style={styles.quantityButton}>*/}
         {/*   <Ionicons*/}
         {/*      name={Platform.OS === 'android' ? 'md-remove-circle' : 'ios-remove-circle'}*/}
         {/*      size={23}*/}
         {/*      color={Colors.accent}*/}
         {/*   />*/}
         {/*</TouchableOpacity>*/}
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
        {props.deletable && (<TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color="red"
          />
        </TouchableOpacity>)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
   quantityButton: {
     marginHorizontal: 4
   }
});

export default CartItem;
