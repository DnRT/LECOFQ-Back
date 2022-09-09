import * as React from 'react';
import { Text, View, Pressable, Image } from 'react-native';

import { styles } from '../css/styles';




function VistaSinElementos({ navigation }) {

  return (
    <View style={styles.itemVSE}>
      <Image
        style={styles.imagenVSE}
        source={require('../images/ic_empty_image.png')}
      />
      <Text style={styles.title}>No hay talleres disponibles por el momento, vuelva pronto!</Text>
      <Pressable style={styles.buttonVSE} onPress={() => navigation.navigate('Menú de inicio')}>
        <Text style={styles.text}>Volver al inicio</Text>
      </Pressable>

    </View>
  );
}



export { VistaSinElementos };