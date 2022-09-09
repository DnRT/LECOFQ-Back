import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable  } from 'react-native';
import * as OpenAnything from 'react-native-openanything';
import FileViewer from 'react-native-file-viewer';

import {styles} from '../css/styles';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

function PantallaInicio({ navigation }) {
return (
    <View style = {{backgroundColor: '#4054B2', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%',height: '100%', alignItems: 'center'}}>
      <Image
        style ={{top: 50, width: 200, height: 200, alignItems: 'center', justifyContent: 'center', }} 
        source={require('../images/logo.png')}
      />
      <Text  style={{ top: 60, fontSize: 20, fontWeight: 'bold', color: 'white', fontFamily:'sans-serif', textAlign:"center" }}>
        Aplicación móvil de talleres de la Corporación Municipal de Deportes Quintero
      </Text>
      
      <Pressable style={styles.button} onPress={() => navigation.navigate('Talleres de la corporación')}>
      <Text style={styles.text}>Ver talleres disponibles</Text>
    </Pressable>
    
    <Pressable style={styles.button2} onPress={() => navigation.navigate('Talleres de la corporación')}>
      <Text style={styles.text}>Ver mis solicitudes</Text>
    </Pressable>

    <Pressable style={styles.button3} onPress={() => navigation.navigate('Preguntas frecuentes')}>
      <Text style={styles.text}>Ver preguntas frecuentes sobre la aplicación</Text>
    </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}


  
export {PantallaInicio};