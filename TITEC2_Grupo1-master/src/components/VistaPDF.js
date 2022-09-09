import * as React from 'react';
import { Text, View, Pressable, Image } from 'react-native';
import { styles } from '../css/styles';
import { WebView } from 'react-native-webview';
import { Constants } from 'expo';


function VistaPDF({ navigation }) {
    const PdfReader = ({ url: uri }) => <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />
    return (
        <PdfReader url="https://drive.google.com/file/d/1z5cHSw8uMNT98DDDAP3xVycJVXPq1K9n/view?usp=sharing" />
    );
}



export { VistaPDF };