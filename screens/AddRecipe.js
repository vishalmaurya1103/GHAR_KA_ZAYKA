import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, SafeAreaView, ScrollView, Linking, Alert } from 'react-native';
import { launchCameraAsync, launchImageLibraryAsync, useCameraPermissions, useMediaLibraryPermissions, PermissionStatus } from 'expo-image-picker';
import { Colors } from '../constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

export default function AddRecipeScreen() {
    const [recipe, setRecipe] = useState({
        photo: null,
        title: '',
        description: '',
        servings: '',
        cookTime: '',
        category: '',
        difficulty: '',
        diet: '',
        calories:'',
        ingredients: [''],
        instruction: [''],
    });

    const [cameraPermissionsInfo, requestCameraPermission] = useCameraPermissions();
    const [mediaLibraryPermissionsInfo, requestMediaLibraryPermission] = useMediaLibraryPermissions();
    const [isModalVisible, setIsModalVisible] = useState(false);

    async function verifyPermissions(permissionType) {
        let permissionResponse;
        if (permissionType === 'camera') {
            permissionResponse = await requestCameraPermission();
        } else if (permissionType === 'mediaLibrary') {
            permissionResponse = await requestMediaLibraryPermission();
        }

        if (permissionResponse.status === PermissionStatus.DENIED) {
            Alert.alert(
                `${permissionType === 'camera' ? 'Camera' : 'Library'} Permission Needed`,
                `You need to grant ${permissionType === 'camera' ? 'camera' : 'media library'} permissions to use this feature. Please go to settings to enable ${permissionType === 'camera' ? 'camera' : 'library'} access.`,
                [
                    { text: 'Open Settings', onPress: () => Linking.openSettings() },
                    { text: 'Cancel', style: 'cancel' }
                ]
            );
            return false;
        }

        return permissionResponse.granted;
    }

    async function handleChoosePhoto(option) {
        let hasPermission = false;

        if (option === 'camera') {
            hasPermission = await verifyPermissions('camera');
        } else if (option === 'gallery') {
            hasPermission = await verifyPermissions('mediaLibrary');
        }

        if (!hasPermission) return;

        let image;
        if (option === 'camera') {
            image = await launchCameraAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5,
            });
        } else if (option === 'gallery') {
            image = await launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5,
            });
        }

        if (image && image.assets && image.assets.length > 0) {
            const firstAsset = image.assets[0];
            if (firstAsset && firstAsset.uri) {
                setRecipe({ ...recipe, photo: firstAsset.uri });
            }
        }

        setIsModalVisible(false);
    }

    const handleAddIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
    };

    const handleIngredientChange = (text, index) => {
        const newIngredients = recipe.ingredients.map((ingredient, i) =>
            i === index ? text : ingredient
        );
        setRecipe({ ...recipe, ingredients: newIngredients });
    };

    const handleAddInstructionStep = () => {
        setRecipe({ ...recipe, instruction: [...recipe.instruction, ''] });
    };

    const handleInstructionChange = (text, index) => {
        const newInstruction = recipe.instruction.map((step, i) =>
            i === index ? text : step
        );
        setRecipe({ ...recipe, instruction: newInstruction });
    };

    const handleSaveRecipe = () => {
        // Save the recipe data, e.g., send it to the server
        console.log(recipe);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity style={styles.photoButton} onPress={() => setIsModalVisible(true)}>
                    {recipe.photo ? (
                        <Image source={{ uri: recipe.photo }} style={styles.photo} />
                    ) : (
                        <Text style={styles.photoButtonText}>Upload Recipe Photo</Text>
                    )}
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Add Title Here : Masala Chai"
                    value={recipe.title}
                    onChangeText={(text) => setRecipe({ ...recipe, title: text })}
                />

                <TextInput
                    style={[styles.input, { height: hp('15%') }]}
                    placeholder={"Add Description for Recipe Here:"}
                    multiline
                    value={recipe.description}
                    onChangeText={(text) => setRecipe({ ...recipe, description: text })}
                />

                <View style={styles.row}>
                    <Text style={styles.label}>Serves:</Text>
                    <TextInput
                        style={[styles.input, styles.smallInput]}
                        placeholder="2 people"
                        value={recipe.servings}
                        onChangeText={(text) => setRecipe({ ...recipe, servings: text })}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Cook Time:</Text>
                    <TextInput
                        style={[styles.input, styles.smallInput]}
                        placeholder="20 mins"
                        value={recipe.cookTime}
                        onChangeText={(text) => setRecipe({ ...recipe, cookTime: text })}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Category:</Text>
                    <TextInput
                        style={[styles.input, styles.smallInput]}
                        placeholder="Snacks / Breakfast"
                        value={recipe.category}
                        onChangeText={(text) => setRecipe({ ...recipe, category: text })}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Difficulty:</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setRecipe({ ...recipe, difficulty: value })}
                        items={[
                            { label: 'Easy', value: 'Easy' },
                            { label: 'Medium', value: 'Medium' },
                            { label: 'Hard', value: 'Hard' },
                        ]}
                        style={{
                            inputIOS: styles.pickerInput,
                            inputAndroid: styles.pickerInput,
                        }}
                        value={recipe.difficulty}
                        placeholder={{
                            label: "Select difficulty",
                            value: null,
                        }}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Diet:</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setRecipe({ ...recipe, diet: value })}
                        items={[
                            { label: 'Veg', value: 'Veg' },
                            { label: 'Non-veg', value: 'Non-veg' },
                        ]}
                        style={{
                            inputIOS: styles.pickerInput,
                            inputAndroid: styles.pickerInput,
                        }}
                        value={recipe.diet}
                        placeholder={{
                            label: "Select diet type",
                            value: null,
                        }}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Calories:</Text>
                    <TextInput
                        style={[styles.input, styles.smallInput]}
                        placeholder="10 kcal"
                        value={recipe.calories}
                        onChangeText={(text) => setRecipe({ ...recipe, calories: text })}
                    />
                </View>

                <View style={styles.ingredientsContainer}>
                    <Text style={styles.sectionTitle}>Ingredients:</Text>
                    {recipe.ingredients.map((ingredient, index) => (
                        <View key={index} style={styles.ingredientRow}>
                            <TextInput
                                style={[styles.input, styles.ingredientInput]}
                                placeholder={`Ingredient ${index + 1}`}
                                value={ingredient}
                                onChangeText={(text) => handleIngredientChange(text, index)}
                            />
                            {index === recipe.ingredients.length - 1 && (
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={handleAddIngredient}>
                                    <Text style={styles.addButtonText}>+</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </View>

                <View style={styles.instructionContainer}>
                    <Text style={styles.sectionTitle}>Instruction:</Text>
                    {recipe.instruction.map((step, index) => (
                        <View key={index} style={styles.instructionRow}>
                            <TextInput
                                style={[styles.input, styles.instructionInput]}
                                placeholder={`Step ${index + 1}`}
                                value={step}
                                onChangeText={(text) => handleInstructionChange(text, index)}
                            />
                            {index === recipe.instruction.length - 1 && (
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={handleAddInstructionStep}>
                                    <Text style={styles.addButtonText}>+</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipe}>
                    <Text style={styles.saveButtonText}>Save Recipe</Text>
                </TouchableOpacity>

                <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleChoosePhoto('camera')}>
                            <Icon name="camera" size={RFPercentage(3)} color={Colors.primary} />
                            <Text style={styles.modalButtonText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleChoosePhoto('gallery')}>
                            <Icon name="image" size={RFPercentage(3)} color={Colors.primary} />
                            <Text style={styles.modalButtonText}>Choose from Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: wp('6%'),
    },
    photoButton: {
        width: '100%',
        height: hp('30%'),
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp('2%'),
        borderRadius: wp('2%'),
    },
    photo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: wp('2%'),
    },
    photoButtonText: {
        fontSize: RFPercentage(2.5),
        color: '#bbb',
    },
    input: {
        width: '100%',
        height: hp('7%'),
        backgroundColor: '#f0f0f0',
        borderRadius: wp('2%'),
        paddingHorizontal: wp('4%'),
        marginBottom: hp('2%'),
        fontSize: RFPercentage(2),
    },
    pickerInput: {
        width: wp('57%'),
        height: hp('7%'),
        marginLeft: wp('1%'),
        paddingVertical: hp('1%'),
        borderRadius: wp('2%'),
        backgroundColor: '#f0f0f0',
        fontSize: RFPercentage(2),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    label: {
        width: wp('30%'),
        fontSize: RFPercentage(2.2),
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: hp('3%'),
    },
    smallInput: {
        width: wp('57%'),
        marginLeft: wp('1%'),
    },
    ingredientsContainer: {
        width: '100%',
        marginBottom: hp('2%'),
    },
    sectionTitle: {
        fontSize: RFPercentage(2.5),
        color: Colors.primary,
        fontWeight: 'bold',
        marginBottom: hp('1%'),
    },
    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1%'),
    },
    ingredientInput: {
        flex: 1,
        fontSize: RFPercentage(2),
    },
    addButton: {
        marginLeft: wp('2%'),
        backgroundColor: Colors.primary,
        borderRadius: wp('50%'),
        width: wp('8%'),
        height: wp('8%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    addButtonText: {
        color: '#fff',
        fontSize: RFPercentage(2.5),
        fontWeight: 'bold',
    },
    instructionContainer: {
        width: '100%',
        marginBottom: hp('2%'),
    },
    instructionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1%'),
    },
    instructionInput: {
        flex: 1,
        fontSize: RFPercentage(2),
    },
    saveButton: {
        width: '100%',
        height: hp('7%'),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp('2%'),
    },
    saveButtonText: {
        fontSize: RFPercentage(2.5),
        color: '#fff',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: wp('5%'),
        borderRadius: 8,
        alignItems: 'center',
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    modalButtonText: {
        marginLeft: wp('3%'),
        fontSize: RFPercentage(2.5),
        color: Colors.primary,
    },
});
