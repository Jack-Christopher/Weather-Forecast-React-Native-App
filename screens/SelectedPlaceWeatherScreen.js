import React, { Component, useState, useLayoutEffect  } from "react";
import { GetStyles } from '../styles/GetStyles.js';
import { Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';

class SelectedPlaceWeatherScreen extends Component
{
    constructor(props)
    {
        super(props);

        this.styles = GetStyles(["container", "appTitle", "button", "icon", "message", "item", "list", "input"]);
        this.state =
        {
            city : "",
            ubication : "",
            weather : "",
            text : "",
            loadingData: 0,
        }
    }


    getCityId = async (city) => {
        this.setState({city: city});
        let url = "https://foreca-weather.p.rapidapi.com/location/search/" + city;
        let resp = await fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
                "x-rapidapi-key": "46329f91e4msh8baa5b2a7080630p101ab2jsncc33c8e9656b"
            } })
        .then(response => response.json())
        .then(data => this.setState({ubication: data.locations[0]}))
        .catch(error => console.log(error));

        this.getWeather();
    }

    getWeather = async () => {
        let url2 = "https://foreca-weather.p.rapidapi.com/current/" + this.state.ubication.id + "?tempunit=C&windunit=MS";
        let resp = await fetch(url2, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
                "x-rapidapi-key": "46329f91e4msh8baa5b2a7080630p101ab2jsncc33c8e9656b"
            }  })
        .then(response => response.json())
        .then(data => this.setState({weather: data.current}))
        .catch(error => console.log(error));
    }

    WeatherForecast = () => {
        if (this.state.loadingData > 0) {
            return (
                <FlatList
                style = {this.styles.list}
                data={[
                    {key: "Weather: " + this.state.weather.symbolPhrase},
                    {key: "Temperature: " + this.state.weather.temperature + "°C" },
                    {key: "Wind Speed: " + this.state.weather.windSpeed + "m/s" },
                    {key: 'Relative Humidity: ' + this.state.weather.relHumidity+ "%"},
                    {key: 'Probability of Precipitation: ' + this.state.weather.precipProb + "%"},
                    {key: 'Cloudiness: ' + this.state.weather.cloudiness},
                    {key: 'Pressure: '+ this.state.weather.pressure + "Pa"},
                    {key: 'Visibility: ' + this.state.weather.visibility},
                    {key: 'UV Index: ' + this.state.weather.uvIndex},
                    {key: 'Dew Point: ' + this.state.weather.dewPoint},
                ]}
                renderItem={({item}) => <Text style={this.styles.item}>{item.key}</Text>}
            />
            );
        }
        else{
            return (
                <Text style = {this.styles.message} >
                    No data yet.              
                </Text>
            )
        }
    };

    render()
    {
        

        return(
            <View style={this.styles.container}>
                <Text style={this.styles.appTitle}>
                    {this.state.city} Weather Forecast
                </Text>
    
                <Text style={this.styles.message}>
                    Introduce a place to show its data:
                </Text>

                <TextInput
                    autoCapitalize="sentences"
                    style={this.styles.input}
                    placeholder="Introduce a place..."
                    onChangeText={(textToSearch) => {
                        this.setState({text: textToSearch});
                    }}
                    onSubmitEditing =  {() => {
                        this.getCityId(this.state.text);
                        this.setState({text : ""});
                        this.setState({loadingData: this.state.loadingData +1});
                        }
                    }
                    value={this.state.text}
                    keyboardAppearance = "dark"
                />
                
                {this.WeatherForecast()}
            </View>
        )
    }
}

export default SelectedPlaceWeatherScreen;