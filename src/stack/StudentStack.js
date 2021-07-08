import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Student from '../scenes/Student';
import SubCategory from '../scenes/Student/SubCategory';
import StudyMaterialList from '../scenes/Student/StudyMaterialList';
import StudentPDFViewer from '../scenes/Student/StudentPDFViewer';
import StudyBookDetail from '../scenes/Student/StudyBookDetail';

const Stack = createStackNavigator();

function LanguageStack() {
    return (
        <Stack.Navigator
            initialRouteName="Student"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Student" component={Student} />
            <Stack.Screen name="Subcategory" component={SubCategory} />
            <Stack.Screen name="StudyMaterialList" component={StudyMaterialList} />
            <Stack.Screen name="StudyBookDetail" component={StudyBookDetail} />
            <Stack.Screen name="StudyPDFViewer" component={StudentPDFViewer} />
        </Stack.Navigator>
    );
}

export default LanguageStack;
