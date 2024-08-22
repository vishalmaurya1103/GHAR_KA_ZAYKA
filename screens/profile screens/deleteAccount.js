import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors'; // Ensure you have Colors defined

const { width } = Dimensions.get('window'); // Get screen width for responsiveness

const DeleteAccount = () => {
  const handleDeleteAccount = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Handle account deletion logic here
            Alert.alert('Account Deleted', 'Your account has been successfully deleted.');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Account</Text>
      <Text style={styles.subtitle}>Permanently delete your account and all associated data.</Text>

      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>

      <Text style={styles.description}>
        Deleting your account is a permanent action and cannot be undone. Once you delete your account:
        {'\n\n'}
        {'\u2022'} All your personal information, including your profile details, settings, and preferences, will be permanently removed from our system.
        {'\n\n'}
        {'\u2022'} Any content you have created, such as posts, comments, and uploaded files, will be erased and cannot be recovered.
        {'\n\n'}
        {'\u2022'} You will lose access to any services or features associated with your account.
        {'\n\n'}
        {'\u2022'} If you have a subscription or any outstanding payments, these will not be refunded or adjusted upon deletion.
        {'\n\n'}
        {'\u2022'} You will need to create a new account if you wish to use our services in the future. Please consider whether you really want to delete your account and ensure you have backed up any important data before proceeding.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    maxWidth: 400, // Adjust maximum width for larger screens
    alignSelf: 'center',
  },
  title: {
    fontSize: width < 350 ? 20 : 24, // Adjust font size based on screen width
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: width < 350 ? 14 : 16, // Adjust font size based on screen width
    marginBottom: 20,
    color: 'gray',
  },
  button: {
    height: 45,
    backgroundColor: Colors.primary, // Red color for delete button
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%', // Full width of the container
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width < 350 ? 14 : 16, // Adjust font size based on screen width
    fontWeight: 'bold',
  },
  description: {
    fontSize: width < 350 ? 12 : 14, // Adjust font size based on screen width
    color: 'gray',
    textAlign: 'left',
    marginTop: 10,
    lineHeight: width < 350 ? 18 : 20, // Adjust line height based on screen width
  },
});

export default DeleteAccount;



