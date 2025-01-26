import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { generateText } from "../ai/deepseek";

const AIChat = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const userMessage = { content: prompt, isUser: true };
      setMessages((prev) => [...prev, userMessage]);

      const aiResponse = await generateText(prompt);
      const aiMessage = { content: aiResponse, isUser: false };

      setMessages((prev) => [...prev, aiMessage]);
      setPrompt("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.isUser ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text style={styles.messageText}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={prompt}
          onChangeText={setPrompt}
          multiline
          editable={!loading}
        />
        <Button
          title={loading ? "Sending..." : "Send"}
          onPress={handleSubmit}
          disabled={loading}
        />
      </View>

      {loading && <ActivityIndicator size="large" style={styles.loader} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  chatContainer: {
    paddingBottom: 16,
  },
  messageBubble: {
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  aiBubble: {
    backgroundColor: "#E5E5EA",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#000",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 50,
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});

export default AIChat;
