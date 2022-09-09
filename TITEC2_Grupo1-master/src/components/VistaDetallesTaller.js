import * as React from 'react';
//import { useState, useEffect } from "react";
import { Text, View, SafeAreaView, Image, Pressable, FlatList, ScrollView } from 'react-native';
import { getDetallesTaller } from '../services/APIRequester';
import { Suspense } from "react";

import { styles } from '../css/styles';
//import { style } from 'react-native-div/helpers/Styler';


function VistaDetallesTaller({ route, navigation }) {
  const { itemId } = route.params;
  //const [posts, setPosts] = useState([]); //retorna el estado de un valor de variable (posts) y una funcion (setPosts) para actualizar esta data
  //var correoid = 0;

  const resource = getDetallesTaller(itemId); //consulta a API

  /*
  const fetchPost = async () => {
    data = await getDetallesTaller(itemId);
    setPosts(data); //se actualiza la data de posts
  };

  useEffect(() => {
    fetchPost();
  }, []);
*/

  function RenderVistaDetalles(props) {
    //Esto funciona para comprobar si llegaron o no los 
    //datos para poder renderizar, sino están aún, vuelve hacia atrás 
    //y renderiza lo que esta en suspend mientras tanto 
    const posts = resource.detallesTaller.read();


    return (
      <SafeAreaView style={styles.containerVT}>
        <ScrollView>
        

          <View style={styles.itemVDT}>

            <View style={styles.itemTittle}>
              <Text style={styles.title}>{posts[0].nombre_actividad}</Text>
            </View>

            <View style={styles.contenedorImagen}>
              {posts[0].fotos[0] == "SIN FOTOS" ? <Image
                style={styles.imagen}
                source={require('../images/sinFoto.png')}
              /> : <Image
                style={styles.imagen}
                source={{ isStatic: true, uri: "http://10.100.6.6:3000/api/images/" + posts[0].fotos[0] }}
              />}

            </View>

            <View style={styles.detalles1}>
              <View style={styles.itemCupos}>
                <Text style={styles.title}>Cupos:</Text>
                <Text style={styles.title}>{posts[0].personas_aceptadas}/{posts[0].cupos}</Text>
              </View>
              <View style={styles.itemEstadoActividad}>
                <Text style={styles.title}>Estado actual: </Text>
                <Text style={styles.title}>{posts[0].estado_actividad}</Text>
              </View>
              <View style={styles.itemFechaInicio}>
                <Text style={styles.title}>Fecha inicio: </Text>
                <Text style={styles.title}>{posts[0].fecha_inicio}</Text>
              </View>
              <View style={styles.itemFechaTermino}>
                <Text style={styles.titleFechaTermino}>Fecha término: </Text>
                <Text style={styles.title}>{posts[0].fecha_termino}</Text>
              </View>
              <View style={styles.itemArea}>
                <Text style={styles.title}>Área: </Text>
                <Text style={styles.title}>{posts[0].area}</Text>
              </View>
              <View style={styles.itemModalidad}>
                <Text style={styles.title}>Modalidad:  </Text>
                <Text style={styles.title}>{posts[0].modalidad}</Text>
              </View>
            </View>
            <View style={styles.detalles2}>
              <View style={styles.subseccion}>
                <Text style={styles.textSubsecciones}>Dirección: {posts[0].direccion} </Text>


              </View>
              <View style={styles.subseccion}>
                <Text style={styles.textSubsecciones}>Descripción: {posts[0].descripción} </Text>
              </View>

              <View style={styles.subseccion}>
                <Text style={styles.textSubsecciones}>Requisitos: {posts[0].requisitos}</Text>
                {posts[0].edad_minima > 0 ?
                <Text style={styles.textSubsecciones}>Edad minima para postular: {posts[0].edad_minima} años</Text>
                : <Text style={styles.textSubsecciones}>La edad minima para postular es de un año</Text>
                }

              </View>
              

              <View style={styles.subseccion}>
                <Text style={styles.textSubsecciones}>Horarios del taller: </Text>
                {posts[0].horarios.map((horario) => <Text style={styles.textSubsecciones}>• {horario}</Text>)}  

              </View>
            </View>

            <View style={styles.datosprofesor}>
              <Text style={styles.textDatosProfesor}>-Datos del profesor/a encargado/a-</Text>
              <Text style={styles.textDatosProfesor}>Nombres: {posts[0].nombres}</Text>
              <Text style={styles.textDatosProfesor}>Apellidos: {posts[0].apellidos}</Text>

              <Text style={styles.textDatosProfesor}>Correos: </Text>
              {posts[0].correos.map((correo) => <Text style={styles.textDatosProfesor}>• {correo}</Text>)}
              <Text style={styles.text}>Número de contacto: {posts[0].numero_contacto}</Text>
            </View>

            {posts[0].personas_aceptadas >= posts[0].cupos ? 
            <Pressable style={styles.buttonVDT} disabled={true} onPress={() => navigation.navigate('Postulaciones', { itemId: posts[0].codigo_actividad, nombre_actividad: posts[0].nombre_actividad, edad_minima:posts[0].edad_minima })}>   
              <Text style={styles.text}>Postular al taller </Text>
            </Pressable>
            :
            <Pressable style={styles.buttonVDT} onPress={() => navigation.navigate('Postulaciones', { itemId: posts[0].codigo_actividad, nombre_actividad: posts[0].nombre_actividad, edad_minima:posts[0].edad_minima })}>   
              <Text style={styles.text}>Postular al taller </Text>
            </Pressable>
            }

          </View>
        </ScrollView>
      </SafeAreaView>
    );

  }


  return (
    <Suspense key={"sus2"} fallback={<Text>Loading ..</Text>}>
      <RenderVistaDetalles key={"nada"}></RenderVistaDetalles>
    </Suspense>
  )

}



export { VistaDetallesTaller };
