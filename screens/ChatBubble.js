import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { Colors } from '../constants/Colors';

const ChatBubble = ({ role, text, onSpeech }) => {
    const { width } = useWindowDimensions(); // Get the current screen width

    return (
        <View
            style={[
                styles.chatItem,
                role === "user" ? styles.userChatItem : styles.modelChatItem,
                { maxWidth: width * 0.8 }, // Adjust based on screen width
            ]}
        >
            <Text style={[styles.chatText, { fontSize: width * 0.04 }]}>{text}</Text>
            {role === "model" && (
                <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
                    <Ionicons name="volume-high-outline" size={width * 0.06} color="#fff" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    chatItem: {
        marginBottom: 10,
        padding: 12,
        borderRadius: 20,
        position: "relative",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
    },
    userChatItem: {
        alignSelf: "flex-end",
        backgroundColor: Colors.primary,
    },
    modelChatItem: {
        alignSelf: "flex-start",
        backgroundColor: "#2c3e50", // Dark gray for model responses
    },
    chatText: {
        color: "#fff",
    },
    speakerIcon: {
        position: "absolute",
        bottom: 8,
        right: 8,
    },
});

export default ChatBubble;
