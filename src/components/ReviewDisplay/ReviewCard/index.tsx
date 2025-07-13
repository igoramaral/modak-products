import Colors from '@/constants/Colors';
import { Review } from '@/src/types/product';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProductRating from '../../ProductDisplay/ProductRating';

interface ReviewCardProps {
    review: Review
}

export default function ReviewCard({review}:ReviewCardProps) {
    const dateStr = review.date;
    const date = new Date(dateStr);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);

    return (
        <View style={styles.reviewCard}>
            <View style={styles.reviewerRow}>
                <Ionicons name="person-circle-outline" size={26} color={Colors.lightGreen} />
                <Text style={styles.reviewerNameText}>{review.reviewerName}</Text>
            </View>

            <ProductRating rating={review.rating}/>

            <Text style={styles.reviewedOnText}>Reviewed on {formattedDate}</Text>

            <Text style={styles.reviewCommentText}>{review.comment}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    reviewCard: {
        paddingVertical: 10
    },
    reviewerRow: {
        flexDirection: "row",
        gap: 5,
    },
    reviewerNameText: {
        color: Colors.blackText,
        fontSize: 18,
        marginBottom: 5
    },
    reviewedOnText: {
        color: Colors.greyText,
        fontSize: 14
    },
    reviewCommentText: {
        color: Colors.blackText,
        marginVertical: 4,
        fontSize: 16
    }
})