import React, { Component, useState, useLayoutEffect  } from "react";
import { GetStyles } from '../styles/GetStyles.js';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

class LocalWeatherScreen extends Component
{
    constructor(props)
    {
        super(props);

        this.styles = GetStyles(["container", "appTitle", "button", "icon", "message", "item", "list"]);
        this.state =
        {
            location : "",
            ubication : "",
            weather : ""      
        }
        this.getIPAddress();
    }
    

    getIPAddress = async () => {
        resp = await fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => this.setState({location: data}))
            .catch(error => console.log(error))
            .then(() => {
                console.log("IP Address: " + this.state.location.ip);
            });

            this.getCityId();
    }

    getCityId = async () => {
        let url = "https://foreca-weather.p.rapidapi.com/location/search/" + this.state.location.city;
        resp = await fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
                "x-rapidapi-key": "46329f91e4msh8baa5b2a7080630p101ab2jsncc33c8e9656b"
            } })
        .then(response => response.json())
        .then(data => this.setState({ubication: data.locations[0]}))
        .catch(error => console.log(error))
        .then(() => {
            console.log("Location ID: " + this.state.ubication.id);
        });

        this.getWeather();
    }

    getWeather = async () => {
        let url2 = "https://foreca-weather.p.rapidapi.com/current/" + this.state.ubication.id + "?tempunit=C&windunit=MS";
        resp = await fetch(url2, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
                "x-rapidapi-key": "46329f91e4msh8baa5b2a7080630p101ab2jsncc33c8e9656b"
            }  })
        .then(response => response.json())
        .then(data => this.setState({weather: data.current}))
        .catch(error => console.log(error))
        .then(() => {
            console.log("Weather: " + this.state.weather.temperature);
        });
    }

    render()
    {
        return(
            <View style={this.styles.container}>
                <Text style={this.styles.appTitle}>
                    Local Weather Forecast
                </Text>
    
                <Text style={this.styles.message}>
                The Weather Forecast is based on your location: 
                {" "}{this.state.location.city}/{this.state.ubication.country}
                    
                </Text>

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
            </View>
        )
    }
}

export default LocalWeatherScreen;