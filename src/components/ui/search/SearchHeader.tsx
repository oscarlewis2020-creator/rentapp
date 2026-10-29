import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SearchHeaderProps {
  searchQuery: string;
  onChangeSearchQuery: (text: string) => void;
  inputRef: React.RefObject<React.ComponentRef<typeof TextInput>>;
  onFilterPress?: () => void;
}

export function SearchHeader({
  searchQuery,
  onChangeSearchQuery,
  inputRef,
  onFilterPress,
}: SearchHeaderProps) {
  return (
    <View style={styles.headerControlBar}>
      <TouchableOpacity
        style={styles.searchBoxFrame}
        activeOpacity={0.9}
        onPress={() => inputRef.current?.focus()}
      >
        <Ionicons
          name="arrow-back"
          size={22}
          color="#FFF"
          style={styles.headerBackIcon}
        />
        <TextInput
          ref={inputRef}
          style={styles.headerInputField}
          placeholder="Search by name or location"
          placeholderTextColor="#9EA5B1"
          value={searchQuery}
          onChangeText={onChangeSearchQuery}
          autoCapitalize="none"
          {...Platform.select({ web: { outlineStyle: "none" } })}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.filterMenuButton}
        activeOpacity={0.7}
        onPress={onFilterPress}
      >
        <Ionicons name="options-outline" size={22} color="#85C1E9" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerControlBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    gap: 12,
  },
  searchBoxFrame: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C2534",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    borderWidth: 1,
    borderColor: "#242F42",
  },
  headerBackIcon: { marginRight: 12 },
  headerInputField: { flex: 1, color: "#FFF", fontSize: 16 },
  filterMenuButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#1C2534",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#242F42",
  },
});
