import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Category from '../scenes/Category';
import BookDetail from '../scenes/Category/BookDetail';
import BookList from '../scenes/Home/BookList';

const Stack = createStackNavigator();

function CategoryStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Book" component={BookDetail} />
            <Stack.Screen name="BookPdfView" component={BookPdfView} />
            <Stack.Screen name="BookList" component={BookList} />
        </Stack.Navigator>
    );
}

export default CategoryStack;
