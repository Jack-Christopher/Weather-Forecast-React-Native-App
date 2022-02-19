import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/HomeScreen';
import LocalWeather from './screens/LocalWeatherScreen';
import SelectedPlaceWeather from './screens/SelectedPlaceWeatherScreen';

const Stack = createStackNavigator();

function MyStack()
{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="LocalWeather" component={LocalWeather} />
            <Stack.Screen name="SelectedPlaceWeather" component={SelectedPlaceWeather} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
