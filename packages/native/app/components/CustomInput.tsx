import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const CustomInput = ({ number, value, readOnly, onChange }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{number} | </Text>
            <TextInput
                style={[styles.input, readOnly ? styles.readOnlyInput : styles.editableInput]}
                value={value}
                editable={!readOnly}
                onChangeText={onChange}
                placeholder='Enter'
                placeholderTextColor={'gray'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: Dimensions.get('window').width < 600 ? '48%' : '31%',
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        marginRight: 4,
    },
    input: {
        flex: 1,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 4,
    },
    editableInput: {
        color: 'black',
    },
    readOnlyInput: {
        color: 'gray',
        backgroundColor: '#f0f0f0',
        opacity: 0.7,
    },
});

export default CustomInput;
