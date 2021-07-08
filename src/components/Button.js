import React from 'react';
// import { styles } from '../assets/style/styles';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

function Button(props) {
    return (
        <View style={props.style}>
            <TouchableOpacity style={styles.textCenter} onPress={props.onPress}>
                <Text style={props.buttonStyle} >
                    {props.icon && (
                        <>
                            <Image
                                source={props.imageIcon}
                                style={{ height: 20, width: 20 }}

                            /> &nbsp;
                        </>
                    )}
                    {props.label}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    textCenter: {
        alignItems: 'center',
    },
});

export default Button;