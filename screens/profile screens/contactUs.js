import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Platform, Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!name || !email || !subject || !message) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    // Logic to send the form data to your backend or email service
    // This can be an API call or integration with an email service like SendGrid, etc.

    Alert.alert('Success', 'Your message has been sent. We will get back to you shortly.');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.subtitle}>We'd love to hear from you! Please fill out the form below to get in touch.</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={text => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={text => setSubject(text)}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe your issue or ask a question"
        value={message}
        onChangeText={text => setMessage(text)}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // For Android
  },
  button: {
    backgroundColor: Colors.primary, // New button color
    borderRadius: 20, // Rounded edges
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactOptions: {
    marginTop: 20,
    width: '100%',
  },
  contactButton: {
    backgroundColor: Colors.primary, // Darker blue for contact buttons
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactUs;


