import React, { Component, useState, useLayoutEffect  } from "react";
import { GetStyles } from '../styles/GetStyles.js';
import { Text, View, TouchableOpacity } from 'react-native';

class StartScreen extends Component
{
    constructor(props)
    {
        super(props);

        this.styles = GetStyles(["container", "appTitle", "button", "icon", "message"]);
        this.state =
        {
            location : "",
            locationId : "",
            weather : ""      
        }
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
        .then(data => this.setState({locationId: data.locations[0].id}))
        .catch(error => console.log(error))
        .then(() => {
            console.log("Location ID: " + this.state.locationId);
        });

        this.getWeather();
    }

    getWeather = async () => {
        let url2 = "https://foreca-weather.p.rapidapi.com/current/" + this.state.locationId + "?tempunit=C&windunit=MS";
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
                    Weather Forecast
                </Text>
    
                <Text style={this.styles.message}>
                    Your IP is: {this.state.location.ip} and your city must be {this.state.location.city}, so 
                    the Weather Forecast will be based on your location:
                </Text>
    
                <Text style={this.styles.message}>
                    The Location ID is: {this.state.locationId}
                </Text>


                <Text style={this.styles.message}>
                    Temperature: {this.state.weather.temperature}°C
                </Text>           

                <Text style={this.styles.message}>
                    Wind Speed: {this.state.weather.windSpeed} m/s
                </Text>  

                <TouchableOpacity
                    onPress={this.getIPAddress}
                    style={this.styles.button}
                >
                    <Text style={this.styles.message}>
                        GetData
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default StartScreen;