import * as React from 'react';
import { useState, useEffect } from "react";
import { FlatList, Text, SafeAreaView, Pressable, View, Image, ImageBackground } from 'react-native';
import { VistaSinElementos } from '../components/VistaSinElementos';
import { VistaError } from '../components/VistaError';
import { Suspense } from "react";
import { FlatlistHeader } from "react-native-flatlist-header";
import { getTalleres } from '../services/APIRequester';

import { styles } from '../css/styles';
import { ErrorBoundary } from './ErrorBoundaries';



function VistaTalleres({ navigation }) {
  //const [posts, setPosts] = useState([]); //retorna el estado de un valor de variable (posts) y una funcion (setPosts) para actualizar esta data

  const resource = getTalleres(); //ahora se obtienen los talleres asincronicamente, mientras se muestra una vista de carga
  /*
  const fetchPost = async () => {
    data = await getTalleres();
    setPosts(data); //se actualiza la data de posts
  };
 
  useEffect(() => {
    fetchPost();
  }, []);
*/

  const Item = ({ title, title2, title3, title4, cod, foto, path }) => (



    <View style={styles.item}>

      <View style={styles.itemTittle}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {foto[0] == "SIN FOTOS" ? <Image
        style={{ width: 210, height: 256, top: -24, borderBottomLeftRadius: 15, }}
        source={require('../images/sinFoto.png')}
      /> : <Image
        style={{ width: 210, height: 256, top: -24, borderBottomLeftRadius: 15, }}
        source={{ isStatic: true, uri: "http://10.100.6.6:3000/api/images/" + foto[0] }}
      />}

      <View style={styles.item3}>
        <Text style={styles.text2}>Fecha de inicio</Text>
        <Text style={styles.title}>{title2}</Text>

      </View>





      <View style={styles.item2}>
        <Text style={styles.text2}>Área deporte</Text>
        <Text style={styles.title}>{title3}</Text>
      </View>
      <View style={styles.item4}>
        <Text style={styles.text3}>Modalidad</Text>
        <Text style={styles.modalidadTalleres}>{title4}</Text>

      </View>


      <Pressable style={styles.buttonVT} onPress={() => navigation.navigate('Detalles', { itemId: cod })}>
        <Text style={styles.text}>Más detalles</Text>
      </Pressable>

    </View>

  );


  const renderItem = ({ item }) => (
    <Item title={item.nombre_actividad} title2={item.fecha_inicio} title3={item.area} title4={item.modalidad} cod={item.codigo_actividad} foto={Object.values(item.fotos)} />
  );


  function RenderVista(props) {
    //Esto funciona para comprobar si llegaron o no los 
    //datos para poder renderizar, sino están aún, vuelve hacia atrás 
    //y renderiza lo que esta en suspend mientras tanto 
    const posts = resource.talleres.read();
    
      return (
        <SafeAreaView style={styles.containerVT}>
          <FlatlistHeader
            data={posts}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            image={require('../images/corporacion.png')}
            navBar={70}
            height={100}
            color={'#4054B2'}
          />
        </SafeAreaView>
      )
  }

  //en suspend podemos poner la vista mientras carga
  return (
    <Suspense key={"sus1"} fallback={<Text>Loading ..</Text>}>
      <ErrorBoundary fallback={<VistaError navigation={navigation}></VistaError>}>
        <RenderVista key={"render"}></RenderVista>
      </ErrorBoundary>
    </Suspense>
  )


}



export { VistaTalleres };