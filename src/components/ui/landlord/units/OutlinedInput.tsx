import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface OutlinedInputProps {
  label: string;
  iconName: any;
  value: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  keyboardType?: "default" | "numeric";
  placeholder?: string;
  isEditable?: boolean;
  rightElement?: React.ReactNode;
}

export function OutlinedInput({
  label,
  iconName,
  value,
  onPress,
  onChangeText,
  keyboardType = "default",
  placeholder,
  isEditable = true,
  rightElement,
}: OutlinedInputProps) {
  const content = (
    <View style={styles.outlinedBox}>
      <Text style={styles.floatingLabel}>{label}</Text>
      <MaterialCommunityIcons
        name={iconName}
        size={20}
        color="#7DD3FC"
        style={styles.leftIcon}
      />

      {isEditable && !onPress ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#64748B"
        />
      ) : (
        <Text style={styles.inputText}>{value || placeholder}</Text>
      )}

      {rightElement ||
        (onPress && (
          <MaterialCommunityIcons name="menu-down" size={24} color="#CBD5E1" />
        ))}
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }

  return content;
}

const styles = StyleSheet.create({
  outlinedBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#64748B",
    borderRadius: 6,
    paddingHorizontal: 14,
    height: 54,
    marginBottom: 18,
    position: "relative",
  },
  floatingLabel: {
    position: "absolute",
    top: -9,
    left: 12,
    backgroundColor: "#161C22",
    paddingHorizontal: 6,
    color: "#CBD5E1",
    fontSize: 12,
  },
  leftIcon: {
    marginRight: 14,
  },
  input: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 16,
  },
  inputText: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 16,
  },
});
