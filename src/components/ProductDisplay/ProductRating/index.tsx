import { getStarIcons } from "@/src/util/getStarIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProductRatingProps {
    rating: number;
}

export default function ProductRating({ rating }: ProductRatingProps) {

    return (
        <View style={styles.ratingContainer}>
            <Text>{getStarIcons(rating)}</Text>
            <Text style={styles.ratingText}>({rating})</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',
        gap: 3,
        alignItems: "center"
    },
    ratingText: {
        fontWeight: 'bold'
    }
});
