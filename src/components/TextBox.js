import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

function TextBox(props) {
    return (
        <View style={ props.style}>
            {props.label && (
                <Text style={styles.textboxLabel}>{props.label}</Text>
            )}
            <View style={styles.textCenter}>
                <TextInput
                    style={{...styles.textBox, borderColor: props.borderColor }}
                    placeholder={props.placeholder}
                    keyboardType={props.keyboardType}
                    onChangeText={props.onChange}
                    value={props.value}
                    numberOfLines={props.numberOfLines}
                    multiline={props.multiline}
                    autoFocus={props.autoFocus}
                    onSubmitEditing={props.onSubmitEditing}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textboxLabel: {
        marginLeft: '17.5%', 
        marginBottom: 3, 
        fontFamily: 'Ubuntu-Regular',
    },
    textBox: {
        borderColor: 'black', 
        width: '97%',
        marginTop: 4, 
        borderWidth: 1, 
        borderRadius: 10, 
        backgroundColor: 'white',
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: 'Ubuntu-Regular',
        paddingTop: 10,
        paddingBottom: 10,
    },
    textCenter: {
        alignItems: 'center',
    },
});

export default TextBox;