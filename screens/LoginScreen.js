// import React, { useState } from 'react';
// import { Image, View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Colors } from '../constants/Colors';
// import { firebase } from '../config/firebase';
// import Input from '../components/Input';
// import Button from '../components/Button';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   function onPressHandler() {
//     navigation.navigate('SignupScreen');
//   }

//   const loginUser = async (email, password) => {
//     try {
//       await firebase.auth().signInWithEmailAndPassword(email, password);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const changePassword = () => {
//     const currentUser = firebase.auth().currentUser;
//     if (currentUser) {
//       firebase
//         .auth()
//         .sendPasswordResetEmail(currentUser.email)
//         .then(() => {
//           alert('Password reset email sent to your email address');
//         })
//         .catch((error) => {
//           alert(error.message);
//         });
//     } else {
//       alert('No user is currently signed in');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image style={styles.img} source={require('../assets/images/Login.jpeg')} />
//       <Text style={styles.headingText}>Login</Text>
//       <View style={styles.formContainer}>
//         <Input
//           value={email}
//           onChangeText={setEmail}
//           placeholder="Email"
//           keyboardType="email-address"
//         />
//         <Input
//           value={password}
//           onChangeText={setPassword}
//           placeholder="Password"
//           secureTextEntry={true}
//         />
//         <Pressable onPress={changePassword}>
//           <Text style={styles.forgotPasswordText}>Forgot password?</Text>
//         </Pressable>
//         <Button onPress={() => loginUser(email, password)} title="LOGIN" />
//       </View>
//       <View style={styles.signupContainer}>
//         <Text style={styles.signupText}>Don't have an account? </Text>
//         <Pressable onPress={onPressHandler}>
//           <Text style={styles.signupLink}>Sign Up</Text>
//         </Pressable>
//       </View>
//       <Text style={styles.lineText}>─────── Log in with ───────</Text>
//       <TouchableOpacity style={styles.googleButton}>
//         <View style={styles.googleButtonContainer}>
//           <Image style={styles.logoImg} source={require('../assets/images/search.png')} />
//           <Text style={styles.googleButtonText}>Login with Google</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: wp('5%'),
//     backgroundColor: Colors.primaryWhite,
//   },
//   img: {
//     width: wp('60%'),
//     height: hp('20%'),
//     resizeMode: 'contain',
//     marginBottom: hp('2%'),
//   },
//   headingText: {
//     fontSize: wp('8%'),
//     color: Colors.primary,
//     marginVertical: hp('1%'),
//   },
//   formContainer: {
//     width: wp('80%'),
//     alignItems: 'center',
//   },
//   forgotPasswordText: {
//     alignSelf: 'flex-end',
//     marginVertical: hp('0.5%'),
//     color: Colors.primary,
//     fontWeight: 'bold',
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: hp('1%'),
//   },
//   signupText: {
//     color: Colors.primaryBlack,
//     fontSize: wp('4%'),
//   },
//   signupLink: {
//     color: Colors.primary,
//     fontWeight: 'bold',
//     fontSize: wp('4%'),
//   },
//   lineText: {
//     color: Colors.primaryBlack,
//     fontSize: wp('4%'),
//     marginVertical: hp('1%'),
//   },
//   googleButton: {
//     backgroundColor: Colors.primary,
//     borderRadius: 25,
//     paddingVertical: hp('1.5%'),
//     alignItems: 'center',
//     width: wp('80%'),
//     marginVertical: hp('1%'),
//   },
//   googleButtonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   googleButtonText: {
//     color: Colors.primaryWhite,
//     fontWeight: 'bold',
//     fontSize: wp('4%'),
//     marginHorizontal: wp('2%'),
//   },
//   logoImg: {
//     width: wp('6%'),
//     height: wp('6%'),
//     resizeMode: 'contain',
//   },
// });


import React, { useState, useEffect } from 'react';
import { Image, View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../constants/Colors';
import { firebase } from '../config/firebase';
import Input from '../components/Input';
import Button from '../components/Button';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkUserLogin = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail) {
        navigation.navigate('HomeScreen'); // Navigate to HomeScreen if email is found
      }
    };

    checkUserLogin();
  }, []);

  const onPressHandler = () => {
    navigation.navigate('SignupScreen');
  };

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      await AsyncStorage.setItem('userEmail', email); // Save email to AsyncStorage
      navigation.navigate('HomeScreen'); // Navigate to HomeScreen after login
    } catch (err) {
      alert(err.message);
    }
  };

  const changePassword = () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase
        .auth()
        .sendPasswordResetEmail(currentUser.email)
        .then(() => {
          alert('Password reset email sent to your email address');
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert('No user is currently signed in');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/images/Login.jpeg')} />
      <Text style={styles.headingText}>Login</Text>
      <View style={styles.formContainer}>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Pressable onPress={changePassword}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </Pressable>
        <Button onPress={() => loginUser(email, password)} title="LOGIN" />
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Pressable onPress={onPressHandler}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </Pressable>
      </View>
      <Text style={styles.lineText}>─────── Log in with ───────</Text>
      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.googleButtonContainer}>
          <Image style={styles.logoImg} source={require('../assets/images/search.png')} />
          <Text style={styles.googleButtonText}>Login with Google</Text>
        </View>
      </TouchableOpacity>
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
  forgotPasswordText: {
    alignSelf: 'flex-end',
    marginVertical: hp('0.5%'),
    color: Colors.primary,
    fontWeight: 'bold',
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
  lineText: {
    color: Colors.primaryBlack,
    fontSize: wp('4%'),
    marginVertical: hp('1%'),
  },
  googleButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
    width: wp('80%'),
    marginVertical: hp('1%'),
  },
  googleButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleButtonText: {
    color: Colors.primaryWhite,
    fontWeight: 'bold',
    fontSize: wp('4%'),
    marginHorizontal: wp('2%'),
  },
  logoImg: {
    width: wp('6%'),
    height: wp('6%'),
    resizeMode: 'contain',
  },
});
