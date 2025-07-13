import Colors from '@/constants/Colors';
import { Review } from '@/src/types/product';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReviewCard from './ReviewCard';

interface ReviewDisplayProps {
    reviews: Review[]
}

export default function ReviewDisplay({reviews}:ReviewDisplayProps) {
    return (
        <View style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>Reviews</Text>

            {reviews.map((item, index)=>(
                <ReviewCard key={item.reviewerEmail + index} review={item} />
            ))}
            
        </View>
    );
}

const styles = StyleSheet.create({
    reviewContainer: {
        margin: 10,
        paddingHorizontal: 10,
    },
    reviewTitle: {
        color: Colors.strongGreen,
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10
    }
})