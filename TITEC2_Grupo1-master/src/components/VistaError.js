import * as React from 'react';
import { Text, View, Pressable, Image } from 'react-native';

import { styles } from '../css/styles';


function VistaError({ navigation }) {
    return (
        <View style={styles.itemError}>
            <Image
                style={styles.imagenVSE}
                source={require('../images/ic_error_loading.png')}
            />
            <Text style={styles.title}>No se pueden obtener los datos por un error en la conexión de la aplicación!</Text>
            <Pressable style={styles.buttonError} onPress={() => navigation.navigate('Menú de inicio')}>
                <Text style={styles.text}>Volver al inicio</Text>
            </Pressable>

        </View>
    );
}



export { VistaError };