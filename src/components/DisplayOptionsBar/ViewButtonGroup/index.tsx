import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { View } from 'react-native';
import { ToggleButton } from 'react-native-paper';

interface ViewButtonGroupProps {
    handlePress: (value: string) => void;
    value: string | null;
    iconSize: number;
    iconColor: string;
}

export default function ViewButtonGroup({handlePress, value, iconSize, iconColor}:ViewButtonGroupProps) {
    return (
        <ToggleButton.Group
            onValueChange={handlePress}
            value={value}
        >
            <ToggleButton 
                icon={() => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="view-grid-outline" size={iconSize} color={iconColor} />
                    </View>
                )}
                value="grid"
            />
            <ToggleButton 
                icon={() => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="view-list-outline" size={iconSize} color={iconColor} />
                    </View>
                )}
                value="list"
            />
        </ToggleButton.Group>
    );
}