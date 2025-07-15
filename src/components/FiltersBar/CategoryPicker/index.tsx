import Colors from '@/constants/Colors';
import { upperCaseString } from '@/src/util/productsUtil';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Menu } from 'react-native-paper';

interface CategoryPickerProps {
  categories: string[] | null;
  selectedCategory: string[];
  setSelectedCategory: (category: string) => void;
}

export default function CategoryPicker({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryPickerProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleSelect = (category: string) => {
    if (!selectedCategory.includes(category)) {
      setSelectedCategory(category);
    }
    closeMenu();
  };

  return (
    <View>
        <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
                <TouchableOpacity onPress={openMenu} style={styles.button}>
                    <FontAwesome6 name="filter" size={24} color={Colors.strongGreen} />
                </TouchableOpacity>
            }
        >
            {categories?.map((category) => (
                <Menu.Item
                key={category}
                onPress={() => handleSelect(category)}
                title={upperCaseString(category)}
                />
            ))}
        </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.strongGreen,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
