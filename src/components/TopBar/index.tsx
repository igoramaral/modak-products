import Colors from '@/constants/Colors';
import { useCart } from '@/src/context/cartContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TopBarProps {
    title?: string;
}

export default function TopBar({title}:TopBarProps) {
    const router = useRouter();
    const { cart } = useCart();

    const countItemsInCart = () => {
        return cart.products.reduce((total, item) => total + item.quantity, 0);
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Image
                source={require("@/assets/images/modak_logo.png")}
                style={{ width: 32, height: 24 }}
                />

                { title && <Text style={styles.title}>{title}</Text> }
            </View>
            
            <TouchableOpacity style={styles.cartButton} onPress={() => router.push('cart')}>
                <MaterialCommunityIcons name="cart-outline" size={24} color={Colors.strongGreen} />
                {cart.products.length > 0 && (
                    <View style={styles.badge}>
                    <Text style={styles.badgeText}>{countItemsInCart()}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{ 
        flexDirection: "row",
        padding: 10,
        backgroundColor: Colors.lightGrey,
        alignItems: "center",
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: '500',
        fontSize: 24,
        color: Colors.strongGreen,
        marginHorizontal: 10
    },
    cartButton:{
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.strongGreen,
        padding: 10
    },
    badge: {
        position: "absolute",
        right: 0,
        top: -4,
        backgroundColor: Colors.strongGreen,
        borderRadius: 10,
        minWidth: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 2,
    },
    badgeText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },
})