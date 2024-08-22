import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Make sure to install this package
import { Colors } from '../../constants/Colors';

// Get screen dimensions
const { width } = Dimensions.get('window');

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChangePassword = () => {
    if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirmation do not match.');
      return;
    }

    // Handle password change logic here

    // Clear the fields after successful password change
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setOldPasswordVisible(false);
    setNewPasswordVisible(false);
    setConfirmPasswordVisible(false);

    Alert.alert('Success', 'Password changed successfully.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.subtitle}>Update your password for security purposes.</Text>

      {/* Old Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry={!oldPasswordVisible}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TouchableOpacity
          style={styles.visibilityButton}
          onPress={() => setOldPasswordVisible(!oldPasswordVisible)}
        >
          <MaterialIcons
            name={oldPasswordVisible ? 'visibility-off' : 'visibility'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* New Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={!newPasswordVisible}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          style={styles.visibilityButton}
          onPress={() => setNewPasswordVisible(!newPasswordVisible)}
        >
          <MaterialIcons
            name={newPasswordVisible ? 'visibility-off' : 'visibility'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm New Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.visibilityButton}
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          <MaterialIcons
            name={confirmPasswordVisible ? 'visibility-off' : 'visibility'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    maxWidth: '98%', // Adjust width based on screen size
    alignSelf: 'center',
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
    paddingLeft: 10,
    marginBottom: 15,
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative', // Added to enable absolute positioning for the button
  },
  visibilityButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -20 }], // Centers the button vertically
  },
  button: {
    height: 45,
    backgroundColor: Colors.primary, // Darker blue for contact buttons
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePassword;






