import Colors from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Menu } from "react-native-paper";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleSelectPage = (page: number) => {
    closeMenu();
    onPageChange(page);
  };

  return (
    <View style={styles.container}>
      <Button
        icon="arrow-left-drop-circle-outline"
        onPress={() => onPageChange(currentPage - 1)}
        disabled={prevDisabled}
        mode="outlined"
        textColor={Colors.strongGreen}
        style={!prevDisabled && {borderColor: Colors.strongGreen}}
      >
        Previous
      </Button>

      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Button
            onPress={openMenu}
            textColor={Colors.strongGreen}
            mode="text"
            icon="chevron-down"
          >
            Page {currentPage} of {totalPages}
          </Button>
        }
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Menu.Item
            key={page}
            onPress={() => handleSelectPage(page)}
            title={`Page ${page}`}
          />
        ))}
      </Menu>

      <Button
        icon="arrow-right-drop-circle-outline"
        onPress={() => onPageChange(currentPage + 1)}
        disabled={nextDisabled}
        mode="outlined"
        contentStyle={{ flexDirection: "row-reverse" }}
        textColor={Colors.strongGreen}
        style={{borderColor: Colors.strongGreen}}
      >
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    gap: 8,
  },
});