import { upperCaseString } from '@/src/util/productsUtil';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet } from 'react-native';

interface CategoryPickerProps {
    categories: string[] | null;
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
}

export default function CategoryPicker({categories, selectedCategory, setSelectedCategory}:CategoryPickerProps) {
    return (
        <Picker
            key={selectedCategory}
            selectedValue={null}
            onValueChange={(value: string|null) => {
                if (value) {
                    setSelectedCategory(value);
                }
            }}
            style={styles.picker}
        >
            <Picker.Item label="Categories" value={null} />
            { categories && categories.map(category => (
                <Picker.Item key={category} label={upperCaseString(category)} value={category} />
            ))}
        </Picker>
    );
}

const styles = StyleSheet.create({
    picker: {
        width: "50%"
    }
})