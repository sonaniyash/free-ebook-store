import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Language from '../scenes/Language';
import BookDetail from '../scenes/Category/BookDetail';
import BookList from '../scenes/Home/BookList';
import BookPdfView from '../scenes/Category/BookPdfView';

const Stack = createStackNavigator();

function LanguageStack() {
    return (
        <Stack.Navigator
            initialRouteName="Language"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Language" component={Language} />
            <Stack.Screen name="Book" component={BookDetail} />
            <Stack.Screen name="BookPdfView" component={BookPdfView} />
            <Stack.Screen name="BookList" component={BookList} />
        </Stack.Navigator>
    );
}

export default LanguageStack;
