import { StyleSheet } from "react-native";
import { AllStyles } from "./AllStyles";

export function GetStyles (names){
    let selected_styles = {};
    for (let name of names)
    {
        selected_styles[name] = AllStyles[name];
    }
    const styles = StyleSheet.create(selected_styles);
    return styles;        
}