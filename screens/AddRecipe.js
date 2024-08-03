import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '../constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

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
        ingredients: [''],
        method: [''],
    });

    const handleChoosePhoto = () => {
        launchImageLibrary({}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.assets[0].uri };
                setRecipe({ ...recipe, photo: source.uri });
            }
        });
    };

    const handleAddIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
    };

    const handleIngredientChange = (text, index) => {
        const newIngredients = recipe.ingredients.map((ingredient, i) =>
            i === index ? text : ingredient
        );
        setRecipe({ ...recipe, ingredients: newIngredients });
    };

    const handleAddMethodStep = () => {
        setRecipe({ ...recipe, method: [...recipe.method, ''] });
    };

    const handleMethodChange = (text, index) => {
        const newMethod = recipe.method.map((step, i) =>
            i === index ? text : step
        );
        setRecipe({ ...recipe, method: newMethod });
    };

    const handleSaveRecipe = () => {
        // Save the recipe data, e.g., send it to the server
        console.log(recipe);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity style={styles.photoButton} onPress={handleChoosePhoto}>
                    {recipe.photo ? (
                        <Image source={{ uri: recipe.photo }} style={styles.photo} />
                    ) : (
                        <Text style={styles.photoButtonText}>Upload Recipe Photo</Text>
                    )}
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Title : Masala Chai"
                    value={recipe.title}
                    onChangeText={(text) => setRecipe({ ...recipe, title: text })}
                />

                <TextInput
                    style={[styles.input, { height: hp('15%') }]}
                    placeholder={"Description: \nShare a little more about the dish.\nWhat or who inspired you to cook it?\nWhat's your favourite way to eat it?"}
                    multiline
                    value={recipe.description}
                    onChangeText={(text) => setRecipe({ ...recipe, description: text })}
                />

                <View style={styles.row}>
                    <Text style={styles.label}>Serves</Text>
                    <TextInput
                        style={[styles.input, styles.smallInput]}
                        placeholder="2 people"
                        value={recipe.servings}
                        onChangeText={(text) => setRecipe({ ...recipe, servings: text })}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Cook Time</Text>
                    <TextInput
                        style={[styles.input, styles.smallInput]}
                        placeholder="20 mins"
                        value={recipe.cookTime}
                        onChangeText={(text) => setRecipe({ ...recipe, cookTime: text })}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Category</Text>
                    <TextInput
                        style={[styles.input, styles.smallInput]}
                        placeholder="Snacks / Breakfast"
                        value={recipe.category}
                        onChangeText={(text) => setRecipe({ ...recipe, category: text })}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Difficulty</Text>
                    <TextInput
                        style={[styles.input, styles.smallInput]}
                        placeholder="Easy / Medium / Hard"
                        value={recipe.difficulty}
                        onChangeText={(text) => setRecipe({ ...recipe, difficulty: text })}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Diet</Text>
                    <TextInput
                        style={[styles.input, styles.smallInput]}
                        placeholder="Veg / Non-veg"
                        value={recipe.diet}
                        onChangeText={(text) => setRecipe({ ...recipe, diet: text })}
                    />
                </View>

                <View style={styles.ingredientsContainer}>
                    <Text style={styles.sectionTitle}>Ingredients</Text>
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

                <View style={styles.methodContainer}>
                    <Text style={styles.sectionTitle}>Method</Text>
                    {recipe.method.map((step, index) => (
                        <View key={index} style={styles.methodRow}>
                            <TextInput
                                style={[styles.input, styles.methodInput]}
                                placeholder={`Step ${index + 1}`}
                                value={step}
                                onChangeText={(text) => handleMethodChange(text, index)}
                            />
                            {index === recipe.method.length - 1 && (
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={handleAddMethodStep}>
                                    <Text style={styles.addButtonText}>+</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipe}>
                    <Text style={styles.saveButtonText}>Save Recipe</Text>
                </TouchableOpacity>
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
    smallInput: {
        width: wp('57%'),
        marginLeft: wp('1%'),
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
    methodContainer: {
        width: '100%',
        marginBottom: hp('2%'),
    },
    methodRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1%'),
    },
    methodInput: {
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
});