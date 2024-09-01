import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    useWindowDimensions,
} from "react-native";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import { speak, isSpeakingAsync, stop } from "expo-speech";
import { Colors } from '../constants/Colors';
import { widthPercentageToDP } from "react-native-responsive-screen";

const Chatbot = () => {
    const [chat, setChat] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const { width, height } = useWindowDimensions(); // Get the current screen dimensions

    const API_KEY = "AIzaSyCfeHi8BTclhubwhJEwhRGxCg1DZCpf1XU";

    const handleUserInput = async () => {
        let updatedChat = [
            ...chat,
            {
                role: "user",
                parts: [{ text: userInput }],
            },
        ];

        setLoading(true);

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                {
                    contents: updatedChat,
                }
            );
            console.log("Gemini Pro API Response:", response.data);

            const modelResponse =
                response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

            if (modelResponse) {
                const updatedChatWithModel = [
                    ...updatedChat,
                    {
                        role: "model",
                        parts: [{ text: modelResponse }],
                    },
                ];

                setChat(updatedChatWithModel);
                setUserInput("");
            }
        } catch (error) {
            console.error("Error calling Gemini Pro API:", error);
            console.error("Error response:", error.response);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSpeech = async (text) => {
        if (isSpeaking) {
            stop();
            setIsSpeaking(false);
        } else {
            if (!(await isSpeakingAsync())) {
                speak(text);
                setIsSpeaking(true);
            }
        }
    };

    const renderChatItem = ({ item }) => (
        <ChatBubble
            role={item.role}
            text={item.parts[0].text}
            onSpeech={() => handleSpeech(item.parts[0].text)}
        />
    );

    return (
        <View style={[styles.container, { padding: width * 0.04 }]}>
            <Text style={[styles.title, { fontSize: width * 0.05 }]}>
                Craving something tasty? Let's find it!
            </Text>
            <FlatList
                data={chat}
                renderItem={renderChatItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.chatContainer}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        { width: width * 0.08, height: height * 0.06 },
                    ]}
                    placeholder="Type your message ..."
                    placeholderTextColor="#aaa"
                    value={userInput}
                    onChangeText={setUserInput}
                />
                <TouchableOpacity
                    style={[styles.button, { width: width * 0.2, height: height * 0.05 }]}
                    onPress={handleUserInput}
                >
                    <Text style={[styles.buttonText, { fontSize: width * 0.045 }]}>
                        Send
                    </Text>
                </TouchableOpacity>
            </View>
            {loading && <ActivityIndicator style={styles.loading} color="#333" />}
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 0.03,
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    title: {
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
    },
    chatContainer: {
        flexGrow: 1,
        justifyContent: "flex-end",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    input: {
        flex: 1,
        marginRight: 8,
        padding: 10,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 25,
        color: "#333",
        backgroundColor: "#fff",
    },
    button: {
        padding: 7,
        backgroundColor: Colors.primary,
        borderRadius: 25,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
    loading: {
        marginTop: 10,
    },
    error: {
        color: "red",
        marginTop: 10,
    },
});

export default Chatbot;

