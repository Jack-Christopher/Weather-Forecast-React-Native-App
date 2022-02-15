import React, { Component } from "react";
import { GetStyles } from '../styles/GetStyles.js';
import { Text, View, TouchableOpacity } from 'react-native';


const StartScreen = ({navigation }) => {
    
    const styles = GetStyles(["container", "appTitle", "button", "icon"]);

    return(
        <Text style={styles.appTitle}>
            Weather Forecast
        </Text>
    )

}

export default StartScreen;