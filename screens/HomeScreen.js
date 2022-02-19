import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { GetStyles } from '../styles/GetStyles.js';
import { Text, View, TouchableOpacity } from 'react-native';

const HomeScreen = ({navigation }) => {

    const styles = GetStyles(["container", "appTitle", "button", "icon"]);

    return (
        <View style={styles.container}>
            <Text style={styles.appTitle}>
                Weather Forecast
            </Text>
            
            
            <View style={styles.icon}>
                <Icon
                    reverse
                    size={64}
                    name='weather-hazy'
                    type='material-community'
                    color='#517fa4'
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    // console.log("Start button pressed");
                    navigation.navigate('LocalWeather');
                }}
            >
            <Text>
                Get Local Weather Forecast
            </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    // console.log("Start button pressed");
                    navigation.navigate('SelectedPlaceWeather');
                }}
            >
            <Text>
                Set place to search for weather
            </Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}


export default HomeScreen;