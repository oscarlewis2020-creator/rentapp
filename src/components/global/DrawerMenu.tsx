// components/DrawerMenu.tsx
import { Ionicons } from "@react-native-vector-icons/ionicons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useUserRole } from "../../app/_layout";
import { UserRole } from "../../types/navigation";

export default function DrawerMenu() {
  const { currentRole, setCurrentRole, isDrawerOpen, setIsDrawerOpen } =
    useUserRole();
  const { width: windowWidth } = useWindowDimensions();

  // Determine an adaptive drawer width: 75% on mobile, capped at 340px on web/desktop
  const drawerWidth = windowWidth > 768 ? 340 : windowWidth * 0.75;

  // React layout lifecycle state
  const [isRendered, setIsRendered] = useState(isDrawerOpen);

  // Animation hooks for slide and fade tracking
  const slideAnim = useRef(new Animated.Value(-drawerWidth)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isDrawerOpen) {
      // Step 1: Render the DOM elements immediately before bringing them into view
      setIsRendered(true);

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      // Step 2: Trigger exit animation sequence first
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -drawerWidth,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        // Step 3: Physically unmount layout nodes only after the exit slide finishes
        setIsRendered(false);
      });
    }
  }, [isDrawerOpen, drawerWidth, slideAnim, fadeAnim]);

  // Clean layout guard using safe local component state
  if (!isRendered) return null;

  const rolesList: {
    id: UserRole;
    label: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
  }[] = [
    { id: "landlord", label: "Landlord Dashboard", icon: "business-outline" },
    { id: "tenant", label: "Tenant Portal", icon: "home-outline" },
    { id: "sales", label: "Sales & Real Estate", icon: "cash-outline" },
  ];

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -drawerWidth,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsDrawerOpen(false);
      setIsRendered(false);
    });
  };

  const selectRole = (role: UserRole) => {
    setCurrentRole(role);
    handleClose();
  };

  return (
    <View style={styles.overlay}>
      {/* Animated Backdrop opacity layer */}
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
      </Animated.View>

      {/* Slide-out drawer body panel */}
      <Animated.View
        style={[
          styles.drawerContainer,
          { width: drawerWidth, transform: [{ translateX: slideAnim }] },
        ]}
      >
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>Workspaces</Text>
          <TouchableOpacity
            onPress={handleClose}
            accessibilityRole="button"
            aria-label="Close drawer"
          >
            <Ionicons name="close" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        <View style={styles.menuItems}>
          {rolesList.map((item) => {
            const isActive = currentRole === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => selectRole(item.id)}
                style={({ hovered, pressed }) => [
                  styles.menuButton,
                  isActive && styles.activeButton,
                  hovered && !isActive && styles.hoveredButton,
                  pressed && styles.pressedButton,
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={isActive ? "#FFF" : "#4A4A4A"}
                  style={styles.icon}
                />
                <Text
                  style={[
                    styles.buttonText,
                    isActive && styles.activeButtonText,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 999,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  drawerContainer: {
    backgroundColor: "#FFF",
    height: "100%",
    paddingTop: 60,
    paddingHorizontal: 20,
    boxShadow: "4px 0px 24px rgba(0, 0, 0, 0.15)", // Native web shadows
    elevation: 16, // Native mobile shadows
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F2",
    paddingBottom: 16,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  menuItems: {
    gap: 8,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "transparent",
    transitionProperty: "background-color",
    transitionDuration: "150ms",
  },
  activeButton: {
    backgroundColor: "#007AFF",
  },
  hoveredButton: {
    backgroundColor: "#F2F4F7",
  },
  pressedButton: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 14,
  },
  buttonText: {
    fontSize: 16,
    color: "#1A1A1A",
    fontWeight: "500",
  },
  activeButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
