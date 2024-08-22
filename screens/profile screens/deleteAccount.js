import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors } from '../../constants/Colors'; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

const DeleteAccount = ({ navigation }) => {
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
            Alert.alert('Account Deleted', 'Your account has been successfully deleted.', [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('StartScreen');
                },
              },
            ]);
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
    padding: wp('5%'), 
    width: '100%',
    maxWidth: wp('95%'), 
    alignSelf: 'center',
  },
  title: {
    fontSize: RFPercentage(3.2), 
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: RFPercentage(2.2), 
    marginBottom: hp('3%'),
    color: 'gray',
  },
  button: {
    height: hp('6%'),
    backgroundColor: Colors.primary, 
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('3%'),
    width: '100%', 
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: RFPercentage(2.2), 
    fontWeight: 'bold',
  },
  description: {
    fontSize: RFPercentage(2), 
    color: 'gray',
    textAlign: 'left',
    marginTop: hp('1%'),
    lineHeight: RFPercentage(2.8), 
  },
});

export default DeleteAccount;