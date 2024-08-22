import React, { useState } from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Switch} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function Settings() {
    const [form, setForm] = useState({
        darkMode: false,
        emailNotifications: true,
        pushNotifications: false,
    });

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ChangePassword')
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: Colors.primary }]}>
                            <FeatherIcon color="#fff" name="key" size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Change Password</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                            <FeatherIcon color="#fff" name="globe" size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Language</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={20} />
                    </TouchableOpacity>

                    <View style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                            <FeatherIcon color="#fff" name="moon" size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Dark Mode</Text>

                        <View style={styles.rowSpacer} />

                        <Switch
                            onValueChange={darkMode => setForm({ ...form, darkMode })}
                            value={form.darkMode} />
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                            <FeatherIcon
                                color="#fff"
                                name="navigation"
                                size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Location</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={20} />
                    </TouchableOpacity>

                    <View style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                            <FeatherIcon color="#fff" name="bell" size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Push Notifications</Text>

                        <View style={styles.rowSpacer} />

                        <Switch
                            onValueChange={pushNotifications =>
                                setForm({ ...form, pushNotifications })}
                            value={form.pushNotifications} />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                            <FeatherIcon color="#fff" name="bell" size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Email Notifications</Text>

                        <View style={styles.rowSpacer} />

                        <Switch
                            onValueChange={emailNotifications =>
                                setForm({ ...form, emailNotifications })}
                            value={form.emailNotifications} />
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('DeleteAccount');
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: Colors.primary }]}>
                            <FeatherIcon
                                color="#fff"
                                name="settings"
                                size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Delete Account</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={20} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    section: {
        paddingHorizontal: wp('6%'),
    },
    sectionTitle: {
        paddingVertical: hp('1.5%'), 
        fontSize: RFPercentage(1.6), 
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: wp('0.27%'), 
    },
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
        borderRadius: 9999,
        marginRight: wp('3%'), 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowLabel: {
        fontSize: RFPercentage(2.3), 
        fontWeight: '400',
        color: '#0c0c0c',
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    image: {
        width: wp('9%'), 
        height: wp('9%'), 
    },
});
