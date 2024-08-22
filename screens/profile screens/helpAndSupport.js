import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Collapsible from 'react-native-collapsible';

// Get screen dimensions
const { width } = Dimensions.get('window');

const HelpAndSupport = () => {
  const [faqCollapsed, setFaqCollapsed] = useState(true);
  const [guidesCollapsed, setGuidesCollapsed] = useState(true);
  const [contactCollapsed, setContactCollapsed] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Help and Support</Text>
      <Text style={styles.subtitle}>Need help? Find answers to your questions or get in touch with us.</Text>

      {/* Search Bar (Commented Out) */}
      {/* <TextInput
        style={styles.searchBar}
        placeholder="Search for help..."
      /> */}

      {/* FAQs Section */}
      <TouchableOpacity onPress={() => setFaqCollapsed(!faqCollapsed)} style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>{faqCollapsed ? '▶' : '▼'} Frequently Asked Questions</Text>
      </TouchableOpacity>
      <Collapsible collapsed={faqCollapsed}>
        <View style={styles.sectionContent}>
          {/* Recipe-Related FAQs */}
          <Text style={styles.question}>How do I submit a recipe?</Text>
          <Text style={styles.answer}>You can submit a recipe by navigating to the "Submit Recipe" section in the app and filling out the necessary details.</Text>
          <Text style={styles.question}>How do I reset my password?</Text>
          <Text style={styles.answer}>Go to the account settings and click on "Reset Password". Follow the instructions provided.</Text>
          
          {/* Account Info FAQs */}
          <Text style={styles.question}>How do I change my username?</Text>
          <Text style={styles.answer}>On the website, tap your profile image in the top right corner, click view my profile and click edit profile. On Android or iOS, tap your profile image in the top right corner, click view my profile and click the pencil icon in the top right to edit your username, email, location, bio, or change your profile picture.</Text>
          <Text style={styles.question}>How do I turn off my notifications?</Text>
          <Text style={styles.answer}>Here is the page where you can edit your notifications preferences.</Text>
          <Text style={styles.question}>I can’t log in, help!</Text>
          <Text style={styles.answer}>To reset your password, please click here. If you still have difficulty logging in, please contact us at help@cookpad.com.</Text>
          <Text style={styles.question}>I want to cancel or delete my account.</Text>
          <Text style={styles.answer}>You can cancel or delete your account by clicking here.</Text>

          {/* Notifications FAQs */}
          <Text style={styles.question}>How do I get emails?</Text>
          <Text style={styles.answer}>If you’d like to be added to our email list, please turn on the notifications by visiting the notifications page.</Text>
          <Text style={styles.question}>How do I unsubscribe from emails?</Text>
          <Text style={styles.answer}>You can change your email and notification preferences at any time by updating your notifications page.</Text>

          {/* Contact FAQs */}
          <Text style={styles.question}>How do I contact Cookpad?</Text>
          <Text style={styles.answer}>You can email us at help@cookpad.com.</Text>
        </View>
      </Collapsible>

      {/* Guides and Tutorials Section */}
      <TouchableOpacity onPress={() => setGuidesCollapsed(!guidesCollapsed)} style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>{guidesCollapsed ? '▶' : '▼'} Guides and Tutorials</Text>
      </TouchableOpacity>
      <Collapsible collapsed={guidesCollapsed}>
        <View style={styles.sectionContent}>
          <Text style={styles.question}>How do I get started with my first recipe?</Text>
          <Text style={styles.answer}>To get started with your first recipe, go to the "Submit Recipe" section, fill in the details like ingredients and steps, and then click on "Submit".</Text>
          <Text style={styles.question}>How do I navigate the app?</Text>
          <Text style={styles.answer}>The app has a bottom navigation bar that allows you to move between different sections such as Home, Search, Favorites, and Profile.</Text>
          <Text style={styles.question}>How do I create and share recipes?</Text>
          <Text style={styles.answer}>You can create a recipe by clicking on the "Submit Recipe" button in the app, entering the required information, and clicking "Submit". You can then share it via social media or direct link.</Text>
          <Text style={styles.question}>How do I manage my profile?</Text>
          <Text style={styles.answer}>To manage your profile, go to the "Profile" section, where you can edit your information, change your profile picture, and update your settings.</Text>
        </View>
      </Collapsible>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  sectionHeaderContainer: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  sectionContent: {
    marginTop: 10,
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  answer: {
    fontSize: 14,
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
  },
  contactOptions: {
    marginTop: 20,
  },
});

export default HelpAndSupport;


