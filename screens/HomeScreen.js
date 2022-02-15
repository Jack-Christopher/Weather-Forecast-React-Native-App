import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { Text, View, TouchableOpacity } from 'react-native';
import { GetStyles } from '../styles/GetStyles.js';

const HomeScreen = ({navigation }) => {

    const styles = GetStyles(["container", "appTitle", "button"]);

    return (
        <View style={styles.container}>
            <Text style={styles.appTitle}>
                Weather Forecast
            </Text>
            
            <Icon
                reverse
                size={75}
                name='weather-hazy'
                type='material-community'
                color='#517fa4'
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log("Start button pressed");
                    alert("Start button pressed");
                    // navigation.navigate('start');
                }}
            >
            <Text>
                Start
            </Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}


export default HomeScreen;