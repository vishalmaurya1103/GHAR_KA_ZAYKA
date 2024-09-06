import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import RecipeCard from '../../components/RecipeCard'; 
import { Colors } from '../../constants/Colors';  

const MyRecipeScreen = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const fetchRecipes = async () => {
            const user = auth.currentUser;

            if (!user) {
                setError('You must be logged in to view your recipes.');
                setLoading(false);
                return;
            }

            try {
                const q = query(collection(db, 'recipes'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);
                
                const recipesList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setRecipes(recipesList);
            } catch (e) {
                setError('Failed to fetch recipes. Please try again later.');
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [auth.currentUser]);

    const renderRecipe = ({ item }) => (
        <RecipeCard
            image={item.photo || null}  
            title={item.title}
            readyInMinutes={item.cookTime}
            veryPopular={item.veryPopular}  
            vegetarian={item.vegetarian}  
            category={item.category}  
            onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
        />
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {recipes.length === 0 ? (
                <Text style={styles.noRecipesText}>No recipes found.</Text>
            ) : (
                <FlatList
                    data={recipes}
                    renderItem={renderRecipe}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryWhite,
        padding: 10,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginVertical: 20,
    },
    noRecipesText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
    listContainer: {
        paddingBottom: 100, 
    },
});

export default MyRecipeScreen;
