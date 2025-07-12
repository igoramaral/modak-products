import Colors from '@/constants/Colors';
import { Product } from '@/src/types/product';
import { getStarIcons } from '@/src/util/getStarIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductPrice from '../ProductPrice';

interface ProductCardProps {
    item: Product;
    viewMode: string
}

export default function ProductCard({item, viewMode}:ProductCardProps) {
    const cardStyle = viewMode === 'grid' ? styles.gridCard : styles.listCard;
    const router = useRouter();

    return (
        <View>
            <TouchableOpacity style={cardStyle} onPress={() => router.push(`/${item.id}`)}>
                <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.thumbnail}
                />
                <View>
                    <Text style={styles.productTitle}>
                        {item.title}
                    </Text>
                    <View style={styles.ratingContainer}>
                        <Text>{getStarIcons(item.rating)}</Text>
                        <Text style={styles.ratingText}>({item.rating})</Text>
                    </View>
                    
                    <ProductPrice value={item.price} />
                    
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
    },
    gridCard: {
        width: '48%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 8,
        backgroundColor: Colors.lightGrey,
        borderRadius: 4,
        elevation: 2,
    },
    thumbnail: {
        width: 90,
        height: 90,
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
    ratingContainer: {
        flexDirection: 'row',
        gap: 3,
        alignItems: "center"
    },
    ratingText: {
        fontWeight: 'bold'
    }
})