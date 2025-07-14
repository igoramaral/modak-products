import Colors from '@/constants/Colors';
import { Product } from '@/src/types/product';
import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CartProductProps {
    product: Product;
    quantity: number;
    updateQuantity: (productId: number, quantity: number) => void;
    removeProduct: (productId: number) => void;
}

export default function CartProductCard({product, quantity, updateQuantity, removeProduct}:CartProductProps) {
    const deleteButtonColor = Colors.discountColor;

    const handleRemoval = () => {
        Alert.alert(
            "Remove Product",
            `Are you sure you want to remove ${product.title} from the cart?`,
            [
                {
                text: "Cancel",
                style: "cancel",
                },
                {
                text: "Remove",
                onPress: () => removeProduct(product.id),
                },
            ],
            { cancelable: true }
        );
    }
    

    const canReduceQuantity = quantity > 1;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: product.thumbnail }}
                style={styles.thumbnail}
            />

            <View style={styles.productTitleContainer}>
                <Text style={styles.productText} numberOfLines={2}>{product.title}</Text>
                <Text style={styles.priceText}>$ {product.price} /each</Text>
                <Text style={styles.priceText}>{product.shippingInformation}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => canReduceQuantity && updateQuantity(product.id, quantity-1)}>
                    <FontAwesome name="minus" size={24} color={Colors.strongGreen}/>
                </TouchableOpacity>

                <Text style={styles.productText}>{quantity}</Text>

                <TouchableOpacity onPress={() => updateQuantity(product.id, quantity+1)}>
                    <FontAwesome name="plus" size={24} color={Colors.strongGreen}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRemoval}>
                    <FontAwesome5 name="trash" size={24} color={Colors.strongGreen}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 5,
        width: "90%"
    },
    thumbnail: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.lightGreen,
        height: 50,
        width: 50
    },
    productTitleContainer:{
        width: "55%",
        marginHorizontal: 5
    },
    productText: {
        fontWeight: '500',
        fontSize: 18,

    },
    priceText: {
        fontSize: 16,
        color: Colors.greyText
    },
    buttonContainer: {
        width: 130,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        justifyContent: 'space-between'
    }
})