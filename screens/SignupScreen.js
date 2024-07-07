import React, { useState } from 'react';
import { Image, View, Text, Pressable, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../constants/Colors';
import { firebase } from '../config/firebase';
import Input from '../components/Input';
import Button from '../components/Button';

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function loginScreenHandler() {
    navigation.navigate('LoginScreen');
  }

  const signupUser = async (email, password, fullName) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'gahre-ka-zayka-login.firebaseapp.com',
      });
      alert('Verification email sent');
      await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
        fullName,
        email,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/images/Signup.jpeg')} />
      <Text style={styles.headingText}>Sign Up</Text>
      <View style={styles.formContainer}>
        <Input value={fullName} onChangeText={setFullName} placeholder="Full name" />
        <Input value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
        <Input value={password} onChangeText={setPassword} placeholder="Enter 6 digit Password" secureTextEntry={true} />
        <Button onPress={() => signupUser(email, password, fullName)} title="SIGN UP" />
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <Pressable onPress={loginScreenHandler}>
          <Text style={styles.signupLink}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
    backgroundColor: Colors.primaryWhite,
  },
  img: {
    width: wp('60%'),
    height: hp('20%'),
    resizeMode: 'contain',
    marginBottom: hp('2%'),
  },
  headingText: {
    fontSize: wp('8%'),
    color: Colors.primary,
    marginVertical: hp('1%'),
  },
  formContainer: {
    width: wp('80%'),
    alignItems: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
  signupText: {
    color: Colors.primaryBlack,
    fontSize: wp('4%'),
  },
  signupLink: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
});
