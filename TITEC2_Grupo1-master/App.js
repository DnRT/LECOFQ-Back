import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {PantallaInicio} from './src/components/PantallaInicio'
import {VistaTalleres} from './src/components/VistaTalleres'
import { VistaDetallesTaller } from './src/components/VistaDetallesTaller';
import { VistaSinElementos } from './src/components/VistaSinElementos';
import { VistaError } from './src/components/VistaError';
import { VistaPDF } from './src/components/VistaPDF';
import { VistaPostulacion } from './src/components/VistaPostulacion';
import { VistaPostulacionConcretada } from './src/components/VistaPostulacionConcretada';
const Stack = createNativeStackNavigator(); //crea un navegador de vistas para los botones que sean presionados

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menú de inicio">
        <Stack.Screen name="Menú de inicio" component={PantallaInicio} />
        <Stack.Screen name="Talleres de la corporación" component={VistaTalleres} />
        <Stack.Screen name="Detalles" component={VistaDetallesTaller} />
        <Stack.Screen name="VistaError" component={VistaError} />
        <Stack.Screen name="VistaSinElementos" component={VistaSinElementos} />
        <Stack.Screen name="Preguntas frecuentes" component={VistaPDF} />
        <Stack.Screen name="Postulaciones" component={VistaPostulacion} />
        <Stack.Screen name="Postulación concretada" component={VistaPostulacionConcretada} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
