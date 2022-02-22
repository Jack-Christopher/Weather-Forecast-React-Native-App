import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { GetStyles } from '../styles/GetStyles.js';
import { Text, View, Linking, Platform, TouchableOpacity } from 'react-native';

const HomeScreen = ({navigation }) => {

    const styles = GetStyles(["container", "appTitle", "button", "icon", "message", "link"]);

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

            <Text style={styles.message}>
                Si desea probar la versión
                {Platform.OS === 'web' ? " móvil de la web" : " web de la aplicación"}
                , puede 
                {Platform.OS === 'web' ? " descargar el APK desde el siguiente enlace: " : " ir al siguiente enlace: "}

                <Text style={styles.link}
                    onPress={() => {
                        Linking.openURL(
                            Platform.OS === 'web' 
                            ? 'https://github.com/Jack-Christopher/Weather-Forecast-React-Native-App/releases' 
                            : 'https://weather-forecast-by-jc.netlify.app' )}
                    }>
                    Versión { Platform.OS === 'web' ? "móvil" : "web" }
                </Text>

            </Text>

            <StatusBar style="auto" />
        </View>
    );
}


export default HomeScreen;