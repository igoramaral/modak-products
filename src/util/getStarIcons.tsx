import Colors from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

export function getStarIcons(rating: number, size = 16, color = Colors.starColor) {
    const stars = [];

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars <= 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
        stars.push(
        <MaterialIcons
            key={`full-${i}`}
            name="star"
            size={size}
            color={color}
        />
        );
    }

    if (hasHalfStar) {
        stars.push(
        <MaterialIcons
            key={`half`}
            name="star-half"
            size={size}
            color={color}
        />
        );
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(
        <MaterialIcons
            key={`empty-${i}`}
            name="star-border"
            size={size}
            color={color}
        />
        );
    }

    return stars;
}
