import { Platform, StyleSheet, View } from "react-native";
import { ActivityIndicator, Modal, Portal, Text } from "react-native-paper";

interface LoadingOverlayProps {
  isLoading: boolean;
  message: string;
}

export function LoadingOverlay({ isLoading, message }: LoadingOverlayProps) {
  return (
    <Portal>
      <Modal
        visible={isLoading}
        dismissable={false}
        // 💡 Use contentContainerStyle to shape the centered alert dialog card box
        contentContainerStyle={styles.cardContainer}
        style={styles.modalOverlay}
      >
        <View style={styles.content}>
          <ActivityIndicator animating={true} color="#007AFF" size="large" />
          <Text style={styles.text}>{message}</Text>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  // 💡 Darkens the underlying background view across all platforms
  modalOverlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  // 💡 Caps the container card dimensions on desktop viewports so it looks well proportioned
  cardContainer: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 12,
    width: "80%",
    maxWidth: 320,
    alignSelf: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
      },
    }),
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16, // Clean structural spacing between spinner and text label
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1E",
    marginTop: 8,
  },
});
