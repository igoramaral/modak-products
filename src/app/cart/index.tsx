import Colors from '@/constants/Colors';
import CartProductCard from '@/src/components/CartProduct';
import { useCart } from '@/src/context/cartContext';
import { CartProduct } from '@/src/types/cart';
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CartPage() {
    const {cart, removeProduct, updateQuantity, clearCart} = useCart();

    const router = useRouter();

    const cartEmpty = cart.products.length === 0;

    const handlePurchase = () => {
        clearCart();
        router.navigate('/');
    }

    const showPurchaseSuccessfullAlert = () => {
        Alert.alert(
            "Purchase successfull",
            `Thank you for your purchase!`,
            [
                {
                text: "Close",
                onPress: () => handlePurchase(),
                },
            ],
            { cancelable: false }
        )
    }

    return (
        <View style={styles.cartPage}>
            <TouchableOpacity style={styles.backButton} onPress={router.back}>
                <Ionicons name="arrow-back-outline" size={30} color={Colors.strongGreen} />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Cart</Text>

            {
                cartEmpty ? 
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Text style={styles.totalText}>Your Cart is empty!</Text>
                    <TouchableOpacity onPress={router.back}>
                        <Text style={styles.totalText}>Click here to return</Text>
                    </TouchableOpacity>
                </View> :
                <View>
                    <View>
                        <FlatList
                            data={cart.products}
                            keyExtractor={( item:CartProduct ) => item.product.id.toString()}
                            renderItem={({ item }) => 
                                <CartProductCard 
                                    product={item.product} 
                                    quantity={item.quantity} 
                                    updateQuantity={updateQuantity} 
                                    removeProduct={removeProduct}
                                />}
                        />
                    </View>

                    <View style={styles.rightAlignedRow}>
                        <Text style={styles.totalText}>Total: ${cart.total.toFixed(2)}</Text>
                    </View>

                    <View style={styles.rightAlignedRow}>
                        <TouchableOpacity style={styles.purchaseButton} onPress={showPurchaseSuccessfullAlert}>
                            <FontAwesome5 name="wallet" size={24} color={Colors.lightGrey} />
                            <Text style={styles.purchaseButtonText}>Buy Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    cartPage: {
        flex: 1
    },
    cartContainer: {
        padding: 10,
        borderRadius: 4,
        elevation: 2,
        flex: 1,
        backgroundColor: Colors.lightGrey
    },
    backButton: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingRight: 20,
        paddingLeft: 10,
        alignItems: "center",
        gap: 5
    },
    backButtonText: {
        fontSize: 14,
        color: Colors.greyText
    },
    title: {
        fontWeight: "600",
        fontSize: 28,
        padding: 10,
        marginHorizontal: 8,
        marginBottom: 10,
        color: Colors.strongGreen
    },
    rightAlignedRow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 5
    },
    totalText: {
        fontWeight: "500",
        fontSize: 24,
        padding: 10,
        marginHorizontal: 8,
        marginVertical: 10,
        color: Colors.blackText,
        justifyContent: 'flex-end'
    },
    purchaseButton:{
        alignSelf: "center",
        flexDirection: "row",
        gap: 5,
        width: "55%",
        backgroundColor: Colors.strongGreen,
        padding: 10,
        borderRadius: 30,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    purchaseButtonText:{
        fontSize: 18,
        color: Colors.lightGrey,
        fontWeight: '500',
        marginLeft: 5
    }
})