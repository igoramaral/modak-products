import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { View } from 'react-native';
import { ToggleButton } from 'react-native-paper';

interface SortButtonGroupProps {
    handlePress: (value: string) => void;
    value: string | null;
    iconSize: number;
    iconColor: string;
}

export default function SortButtonGroup({handlePress, value, iconSize, iconColor}:SortButtonGroupProps) {
    return (
        <ToggleButton.Group
            onValueChange={handlePress}
            value={value}
        >
            <ToggleButton 
                icon={() => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome6 name="dollar-sign" size={iconSize} color={iconColor} />
                        <FontAwesome name="sort-numeric-asc" size={iconSize} color={iconColor} style={{ marginLeft: 4 }} />
                    </View>
                )}
                value="price asc"
            />
            <ToggleButton 
                icon={() => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome6 name="dollar-sign" size={iconSize} color={iconColor} />
                        <FontAwesome name="sort-numeric-desc" size={iconSize} color={iconColor} style={{ marginLeft: 4 }} />
                    </View>
                )}
                value="price desc"
            />
            <ToggleButton 
                icon={() => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="star" size={iconSize} color={iconColor} />
                        <FontAwesome name="sort-numeric-asc" size={iconSize} color={iconColor} style={{ marginLeft: 4 }} />
                    </View>
                )}
                value="rating asc"
            />
            <ToggleButton 
                icon={() => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="star" size={iconSize} color={iconColor} />
                        <FontAwesome name="sort-numeric-desc" size={iconSize} color={iconColor} style={{ marginLeft: 4 }} />
                    </View>
                )}
                value="rating desc"
            />
        </ToggleButton.Group>
    );
}