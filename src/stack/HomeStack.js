import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../scenes/Home';
import BookList from '../scenes/Home/BookList';
import BookDetail from '../scenes/Category/BookDetail';
import BookPdfView from '../scenes/Category/BookPdfView';

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="BookList" component={BookList} />
            <Stack.Screen name="Book" component={BookDetail} />
            <Stack.Screen name="BookPdfView" component={BookPdfView} />
        </Stack.Navigator>
    );
}

export default HomeStack;
