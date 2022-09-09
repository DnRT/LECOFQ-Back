import * as React from 'react';
import { Text, View, Pressable, Image } from 'react-native';

import { styles } from '../css/styles';
//import DateTimePicker from '@react-native-community/datetimepicker';
//import { RadioButton } from 'react-native-paper';
//import Dialog from "react-native-dialog";

//import { setDatosPostulacion } from '../services/APIRequester';

function VistaPostulacionConcretada({ navigation }) {
    return (
        <View style={styles.itemError}>
            <Image
                style={styles.imagenVSE}
                source={require('../images/imagenFelicidades.png')}
            />
            <Text style={styles.title}>Felicidades!! su postulación ha sido enviada!! debe esperar a que lo contacten</Text>
            <Pressable style={styles.buttonError} onPress={() => navigation.navigate('Menú de inicio')}>
                <Text style={styles.text}>Volver al inicio</Text>
            </Pressable>

        </View>
    );
}

export { VistaPostulacionConcretada };