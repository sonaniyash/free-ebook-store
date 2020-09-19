import React from 'react';
import { Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Category from '../stack/CategoryStack';
import HomeStack from '../stack/HomeStack';
import Language from '../stack/LanguageStack';

const Tab = createBottomTabNavigator();

function MyTabs(){
    return (
        <Tab.Navigator
            initialRouteName="Service"
            tabBarOptions={{
            activeTintColor: 'white',
            activeBackgroundColor: 'grey',
            inactiveBackgroundColor: '#4267B2',
            inactiveTintColor: 'white',
            tabStyle: {
                borderRightColor: 'white',
                borderLeftWidth: 0.5,
            },
            style: {
                height: 60,
            },
            labelStyle: {
                paddingBottom: 7,
                fontSize: 13,
                fontFamily: 'Ubuntu-Regular'
            },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Books',
                    tabBarIcon: () => {
                        return (
                            <Image source={require('../assets/img/book_icon.png')} style={{ height: 25, width: 25 }} />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Category"
                component={Category}
                options={{
                    tabBarLabel: 'Category',
                    tabBarIcon: () => {
                        return (
                            <Image source={require('../assets/img/category.png')} style={{ height: 23, width: 23}} />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Language"
                component={Language}
                options={{
                    tabBarLabel: 'Languages',
                    tabBarIcon: () => {
                        return (
                            <Image source={require('../assets/img/info.png')} style={{ height: 23, width: 23 }} />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    );
}

export default MyTabs;