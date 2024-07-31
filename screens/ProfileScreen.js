// import React, { useState } from 'react';
// import {
//     StyleSheet,
//     SafeAreaView,
//     ScrollView,
//     View,
//     Text,
//     TouchableOpacity,
//     Switch,
//     Image,
// } from 'react-native';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import { Colors } from '../constants/Colors';
// import { useNavigation } from '@react-navigation/native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { RFPercentage } from 'react-native-responsive-fontsize';

// export default function ProfileScreen() {
//     const [form, setForm] = useState({
//         darkMode: false,
//         emailNotifications: true,
//         pushNotifications: false,
//     });

//     const navigation = useNavigation();

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//             <View style={styles.profile}>
//                 <TouchableOpacity
//                     onPress={() => {
//                         // handle onPress
//                     }}>
//                     <View style={styles.profileAvatarWrapper}>
//                         <Image
//                             alt=""
//                             source={{
//                                 uri: 'https://img.freepik.com/free-photo/funny-monkey-with-glasses-studio_23-2150844104.jpg?t=st=1721922868~exp=1721926468~hmac=1fe1c22cd28b6163b56e5a7f601f268d8844d65a5da89466e67d2c30d2395427&w=740',
//                             }}
//                             style={styles.profileAvatar} />

//                         <TouchableOpacity
//                             onPress={() => {
//                                 // handle onPress
//                             }}>
//                             <View style={styles.profileAction}>
//                                 <FeatherIcon color="#fff" name="edit-3" size={wp('4%')} />
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                 </TouchableOpacity>

//                 <View>
//                     <Text style={styles.profileName}>John Wick</Text>

//                     <Text style={styles.profileAddress}>
//                         gaandfaadApp@gmail.com
//                     </Text>
//                 </View>
//             </View>

//             <ScrollView>
//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Preferences</Text>

//                     <TouchableOpacity
//                         onPress={() => {
//                             // navigation.navigate('Profile');
//                         }}
//                         style={styles.row}>
//                         <View style={[styles.rowIcon, { backgroundColor: '#eeeeef' }]}>
//                             <Image source={require("../assets/images/account.png")}
//                                 style={styles.image}
//                             />
//                         </View>

//                         <Text style={styles.rowLabel}>Edit Profile</Text>

//                         <View style={styles.rowSpacer} />

//                         <FeatherIcon
//                             color="#C6C6C6"
//                             name="chevron-right"
//                             size={wp('5%')} />
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         onPress={() => {
//                             // handle onPress
//                         }}
//                         style={styles.row}>
//                         <View style={[styles.rowIcon, { backgroundColor: '#eeeeef' }]}>
//                             <Image source={require("../assets/images/recipe-book.png")}
//                                 style={styles.image}
//                             />
//                         </View>

//                         <Text style={styles.rowLabel}>My Recipes</Text>

//                         <View style={styles.rowSpacer} />

//                         <FeatherIcon
//                             color="#C6C6C6"
//                             name="chevron-right"
//                             size={wp('5%')} />
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         onPress={() => {
//                             navigation.navigate('Settings');
//                         }}
//                         style={styles.row}>
//                         <View style={[styles.rowIcon, { backgroundColor: Colors.primary }]}>
//                             <FeatherIcon
//                                 color="#fff"
//                                 name="settings"
//                                 size={wp('5%')} />
//                         </View>

//                         <Text style={styles.rowLabel}>Settings</Text>

//                         <View style={styles.rowSpacer} />

//                         <FeatherIcon
//                             color="#C6C6C6"
//                             name="chevron-right"
//                             size={wp('5%')} />
//                     </TouchableOpacity>
//                 </View>

//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Resources</Text>

//                     <TouchableOpacity
//                         onPress={() => {
//                             // handle onPress
//                         }}
//                         style={styles.row}>
//                         <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
//                             <FeatherIcon color="#fff" name="flag" size={wp('5%')} />
//                         </View>

//                         <Text style={styles.rowLabel}>Help And Support</Text>

//                         <View style={styles.rowSpacer} />

//                         <FeatherIcon
//                             color="#C6C6C6"
//                             name="chevron-right"
//                             size={wp('5%')} />
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         onPress={() => {
//                             // handle onPress
//                         }}
//                         style={styles.row}>
//                         <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
//                             <FeatherIcon color="#fff" name="flag" size={wp('5%')} />
//                         </View>

//                         <Text style={styles.rowLabel}>Security And Privacy</Text>

//                         <View style={styles.rowSpacer} />

//                         <FeatherIcon
//                             color="#C6C6C6"
//                             name="chevron-right"
//                             size={wp('5%')} />
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         onPress={() => {
//                             // handle onPress
//                         }}
//                         style={styles.row}>
//                         <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
//                             <FeatherIcon color="#fff" name="mail" size={wp('5%')} />
//                         </View>

//                         <Text style={styles.rowLabel}>Contact Us</Text>

//                         <View style={styles.rowSpacer} />

//                         <FeatherIcon
//                             color="#C6C6C6"
//                             name="chevron-right"
//                             size={wp('5%')} />
//                     </TouchableOpacity>


//                     <TouchableOpacity
//                         onPress={() => {
//                             // handle onPress
//                         }}
//                         style={styles.row}>
//                         <View style={[styles.rowIcon, { backgroundColor: Colors.primary }]}>
//                             <FeatherIcon color="#fff" name="log-out" size={wp('5%')} />
//                         </View>

//                         <Text style={styles.rowLabel}>Log Out</Text>

//                         <View style={styles.rowSpacer} />

//                         <FeatherIcon
//                             color="#C6C6C6"
//                             name="chevron-right"
//                             size={wp('5%')} />
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     /** Profile */
//     profile: {
//         padding: wp('6%'),
//         backgroundColor: '#fff',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     profileAvatarWrapper: {
//         marginTop: hp('10%'),
//         position: 'relative',
//     },
//     profileAvatar: {
//         width: wp('20%'),
//         height: wp('20%'),
//         borderRadius: wp('50%'),
//     },
//     image: {
//         width: wp('9%'),
//         height: wp('9%'),
//     },
//     profileAction: {
//         position: 'absolute',
//         right: wp('-1%'),
//         bottom: wp('-2.5%'),
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: wp('7%'),
//         height: wp('7%'),
//         borderRadius: wp('50%'),
//         backgroundColor: '#007bff',
//     },
//     profileName: {
//         marginTop: hp('2.5%'),
//         fontSize: RFPercentage(2.4),
//         fontWeight: '600',
//         color: '#414d63',
//         textAlign: 'center',
//     },
//     profileAddress: {
//         marginTop: hp('0.6%'),
//         fontSize: RFPercentage(2),
//         color: '#989898',
//         textAlign: 'center',
//     },
//     /** Section */
//     section: {
//         paddingHorizontal: wp('6%'),
//     },
//     sectionTitle: {
//         paddingVertical: hp('1.5%'),
//         fontSize: RFPercentage(1.6),
//         fontWeight: '600',
//         color: '#9e9e9e',
//         textTransform: 'uppercase',
//         letterSpacing: 1.1,
//     },
//     /** Row */
//     row: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         height: hp('6.5%'),
//         backgroundColor: '#f2f2f2',
//         borderRadius: wp('2%'),
//         marginBottom: hp('1.5%'),
//         paddingHorizontal: wp('3%'),
//     },
//     rowIcon: {
//         width: wp('8%'),
//         height: wp('8%'),
//         borderRadius: wp('50%'),
//         marginRight: wp('3%'),
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     rowLabel: {
//         fontSize: RFPercentage(2.2),
//         fontWeight: '400',
//         color: '#0c0c0c',
//     },
//     rowSpacer: {
//         flexGrow: 1,
//         flexShrink: 1,
//         flexBasis: 0,
//     },
// });


import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Switch,
    Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { firebase } from '../config/firebase'; // Ensure firebase is imported
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is imported

export default function ProfileScreen() {
    const [form, setForm] = useState({
        darkMode: false,
        emailNotifications: true,
        pushNotifications: false,
    });

    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await firebase.auth().signOut();
            await AsyncStorage.removeItem('userEmail'); // Remove stored user data
            navigation.navigate('LoginScreen'); // Navigate to the login screen
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.profile}>
                <TouchableOpacity
                    onPress={() => {
                        // handle onPress
                    }}>
                    <View style={styles.profileAvatarWrapper}>
                        <Image
                            alt=""
                            source={{
                                uri: 'https://img.freepik.com/free-photo/funny-monkey-with-glasses-studio_23-2150844104.jpg?t=st=1721922868~exp=1721926468~hmac=1fe1c22cd28b6163b56e5a7f601f268d8844d65a5da89466e67d2c30d2395427&w=740',
                            }}
                            style={styles.profileAvatar} />

                        <TouchableOpacity
                            onPress={() => {
                                // handle onPress
                            }}>
                            <View style={styles.profileAction}>
                                <FeatherIcon color="#fff" name="edit-3" size={wp('4%')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

                <View>
                    <Text style={styles.profileName}>John Wick</Text>

                    <Text style={styles.profileAddress}>
                        gaandfaadApp@gmail.com
                    </Text>
                </View>
            </View>

            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <TouchableOpacity
                        onPress={() => {
                            // navigation.navigate('Profile');
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#eeeeef' }]}>
                            <Image source={require("../assets/images/account.png")}
                                style={styles.image}
                            />
                        </View>

                        <Text style={styles.rowLabel}>Edit Profile</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={wp('5%')} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#eeeeef' }]}>
                            <Image source={require("../assets/images/recipe-book.png")}
                                style={styles.image}
                            />
                        </View>

                        <Text style={styles.rowLabel}>My Recipes</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={wp('5%')} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Settings');
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: Colors.primary }]}>
                            <FeatherIcon
                                color="#fff"
                                name="settings"
                                size={wp('5%')} />
                        </View>

                        <Text style={styles.rowLabel}>Settings</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={wp('5%')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resources</Text>

                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
                            <FeatherIcon color="#fff" name="flag" size={wp('5%')} />
                        </View>

                        <Text style={styles.rowLabel}>Help And Support</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={wp('5%')} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
                            <FeatherIcon color="#fff" name="flag" size={wp('5%')} />
                        </View>

                        <Text style={styles.rowLabel}>Security And Privacy</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={wp('5%')} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                            <FeatherIcon color="#fff" name="mail" size={wp('5%')} />
                        </View>

                        <Text style={styles.rowLabel}>Contact Us</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={wp('5%')} />
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={handleLogout} // Integrate logout functionality
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: Colors.primary }]}>
                            <FeatherIcon color="#fff" name="log-out" size={wp('5%')} />
                        </View>

                        <Text style={styles.rowLabel}>Log Out</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={wp('5%')} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    /** Profile */
    profile: {
        padding: wp('6%'),
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileAvatarWrapper: {
        marginTop: hp('10%'),
        position: 'relative',
    },
    profileAvatar: {
        width: wp('20%'),
        height: wp('20%'),
        borderRadius: wp('50%'),
    },
    image: {
        width: wp('9%'),
        height: wp('9%'),
    },
    profileAction: {
        position: 'absolute',
        right: wp('-1%'),
        bottom: wp('-2.5%'),
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('7%'),
        height: wp('7%'),
        borderRadius: wp('50%'),
        backgroundColor: '#007bff',
    },
    profileName: {
        marginTop: hp('2.5%'),
        fontSize: RFPercentage(2.4),
        fontWeight: '600',
        color: '#414d63',
        textAlign: 'center',
    },
    profileAddress: {
        marginTop: hp('0.6%'),
        fontSize: RFPercentage(2),
        color: '#989898',
        textAlign: 'center',
    },
    /** Section */
    section: {
        paddingHorizontal: wp('6%'),
    },
    sectionTitle: {
        paddingVertical: hp('1.5%'),
        fontSize: RFPercentage(1.6),
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
    },
    /** Row */
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: hp('6.5%'),
        backgroundColor: '#f2f2f2',
        borderRadius: wp('2%'),
        marginBottom: hp('1.5%'),
        paddingHorizontal: wp('3%'),
    },
    rowIcon: {
        width: wp('8%'),
        height: wp('8%'),
        borderRadius: wp('50%'),
        marginRight: wp('3%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowLabel: {
        fontSize: RFPercentage(2.2),
        fontWeight: '400',
        color: '#0c0c0c',
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
});
