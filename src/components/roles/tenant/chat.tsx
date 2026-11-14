import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

interface TenantChatProps {
  currentUserId?: string;
  recipientName?: string;
  propertyUnit?: string;
}

export default function TenantChat({
  currentUserId = "tenant",
  recipientName = "Mr. Peter (Landlord)",
  propertyUnit = "Sunrise Heights - Unit 4B",
}: TenantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "2",
      senderId: "tenant",
      text: "Thank you!",
      timestamp: "10:05 AM",
    },
    {
      id: "1",
      senderId: "landlord",
      text: "Hello Brian, Let me know if you need any assistance.",
      timestamp: "10:00 AM",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [newMessage, ...prev]);
    setInputText("");
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <StatusBar barStyle="light-content" />

      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{recipientName}</Text>
          <Text style={styles.headerSubtitle}>{propertyUnit}</Text>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => {
          const isMe = item.senderId === currentUserId;
          return (
            <View
              style={[
                styles.messageBubbleContainer,
                isMe ? styles.myMessageContainer : styles.theirMessageContainer,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  isMe ? styles.myBubble : styles.theirBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    isMe ? styles.myText : styles.theirText,
                  ]}
                >
                  {item.text}
                </Text>
                <Text
                  style={[
                    styles.timestampText,
                    isMe ? styles.myTimestamp : styles.theirTimestamp,
                  ]}
                >
                  {item.timestamp}
                </Text>
              </View>
            </View>
          );
        }}
      />

      {/* Input Footer Bar */}
      <View
        style={[
          styles.inputFooter,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#9ca3af"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, { opacity: inputText.trim() ? 1 : 0.5 }]}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
          activeOpacity={0.8}
        >
          <Ionicons name="send" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
    backgroundColor: "#111827",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 1,
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageBubbleContainer: {
    marginVertical: 4,
    flexDirection: "row",
  },
  myMessageContainer: {
    justifyContent: "flex-end",
  },
  theirMessageContainer: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: "#38bdf8",
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    backgroundColor: "#1f2937",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#374151",
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  myText: {
    color: "#0f172a",
    fontWeight: "500",
  },
  theirText: {
    color: "#ffffff",
  },
  timestampText: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  myTimestamp: {
    color: "#0f172a",
    opacity: 0.7,
  },
  theirTimestamp: {
    color: "#9ca3af",
  },
  inputFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#111827",
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
  },
  input: {
    flex: 1,
    backgroundColor: "#1f2937",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "#ffffff",
    fontSize: 14,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: "#374151",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#38bdf8",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
