import Colors from '@/constants/Colors';
import { useCart } from '@/src/context/cartContext';
import { Product } from '@/src/types/product';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductPrice from '../ProductPrice';
import ProductRating from '../ProductRating';

const screenWidth = Dimensions.get("window").width;
const gap = 8;
const numColumns = 2;
const cardWidth = (screenWidth - (gap * (numColumns + 1))) / numColumns;

interface ProductCardProps {
    item: Product;
    viewMode: string
}

export default function ProductCard({item, viewMode}:ProductCardProps) {
    const cardStyle = viewMode === 'grid' ? [styles.gridCard, {width: cardWidth}] : styles.listCard;
    const  { addProduct } = useCart()
    const router = useRouter();

    return (
        <View>
            <TouchableOpacity style={cardStyle} onPress={() => router.push(`/product/${item.id}`)}>
                <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.thumbnail}
                />
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{flex: 1}}>
                        <Text style={styles.productTitle}>
                        {item.title}
                        </Text>
                        
                        <ProductRating rating={item.rating} />
                        
                        <ProductPrice value={item.price} />
                    </View>
                    
                    <TouchableOpacity style={styles.addToCartButton} onPress={()=>{addProduct(item, 1)}}>
                        <Ionicons name="cart" size={24} color={Colors.lightGrey} />
                        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
        </View>
        
    );
}

const styles = StyleSheet.create({
    listCard: {
        flexDirection: "row",
        padding: 8,
        marginBottom: 8,
        backgroundColor: "#fff",
        borderRadius: 4,
        elevation: 2,
        minHeight: 140,
    },
    gridCard: {
        minHeight: 350,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: gap,
        backgroundColor: Colors.lightGrey,
        borderRadius: 4,
        elevation: 2,
    },
    thumbnail: {
        width: 100,
        height: 100,
        marginRight: 8,
        borderRadius: 4,
        alignSelf: "center"
    },
    productTitle: {
        fontSize: 18,
        fontWeight: "500",
        marginVertical: 5,
        color: Colors.blackText
    },
    addToCartButton:{
        flexDirection: "row",
        gap: 5,
        backgroundColor: Colors.strongGreen,
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    addToCartButtonText:{
        fontSize: 18,
        color: Colors.lightGrey,
        fontWeight: '500'
    }
})