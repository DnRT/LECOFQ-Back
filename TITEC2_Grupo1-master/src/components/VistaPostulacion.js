//import * as React from 'react';
import React, { useCallback, useState } from "react";

import { Text, View, SafeAreaView, ScrollView, Pressable, TextInput, Button } from 'react-native';

import { styles } from '../css/styles';

import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import Dialog from "react-native-dialog";
import { VistaPostulacionConcretada } from '../components/VistaPostulacionConcretada';
import { setDatosPostulacion } from '../services/APIRequester';
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';


function VistaPostulacion({ route, navigation }) {

    //-----ATRIBUTOS
    const { itemId, nombre_actividad, edad_minima } = route.params;
    //console.log("idemID: "+itemId+", nombre: "+nombre_actividad);

    //los cuatro forman el rut completo de la persona
    const [rutP1, onChangeRut1] = React.useState(null);
    const [rutP2, onChangeRut2] = React.useState(null);
    const [rutP3, onChangeRut3] = React.useState(null);
    const [rutP4, onChangeRut4] = React.useState(null);

    const [nombres, onChangeNombres] = React.useState(null);
    const [apellidos, onChangeApellidos] = React.useState(null);

    const [numero_contacto, onChangeNumeroContacto] = React.useState(null);

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    //radio button
    const [previsionChecked, setPrevisionChecked] = React.useState(null);
    const [distritoChecked, setDistritoChecked] = React.useState(null);


    const [correos, setCorreos] = useState(null); //correos
    const [numero, setNumero] = useState(null); //numero
    const [poblacion, setPoblacion] = useState(null); //barrio --> base de datos poblacion
    const [calle, setCalle] = useState(null); //calle

    //dialogo
    const [visible, setVisible] = useState(false);

    //manejadores de errores
    const [rutError, setRutError] = useState("");

    const [nombreError, setNombreError] = useState("");
    const [apellidosError, setApellidosError] = useState("");

    const [numero_contactoError, setNumero_contactoError] = useState("");

    const [dateError, setDateError] = useState("");

    const [previsionCheckedError, setPrevisionCheckedError] = useState("");
    const [distritoCheckedError, setDistritoCheckedError] = useState("");

    const [correosError, setCorreosError] = useState("");
    const [numeroError, setNumeroError] = useState("");
    const [poblacionError, setPoblacionError] = useState("");
    const [calleError, setCalleError] = useState("");

    //------FUNCIONES O METODOS

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };


    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showDialog = () => {
        setVisible(true);  
    };

    const showDialog2 = () => {
        setVisible(true)
    }
    const handleCancel = () => {
        setVisible(false);
    };

    const handleConfirm =  async () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        var finalizacion = await getInfo(itemId, rutP1, rutP2, rutP3, rutP4, nombres, apellidos, numero_contacto, date, previsionChecked, correos, distritoChecked, numero, poblacion, calle )
        if(finalizacion==true){
            setVisible(false);
            navigation.navigate("Postulación concretada")
        }else{

        }
        

    };


    const validForm = () => {
        let valid = true; // true no existe error, false existe error
        try {
            var listaValidacionCorreo = ["hotmail.com", "gmail.com", "live.com", "hotmail.es", "yahoo.es", "alumnos.uv.cl"];

            if (rutP1 == null || rutP2 == null || rutP3 == null || rutP4 == null || rutP1 == "" || rutP2 == "" || rutP3 == "" || rutP4 == "") {
                setRutError("Ingrese bien los datos en el rut");
                valid = false;
            } else {
                setRutError("");
            }
            if (nombres == null || nombres == "") {
                setNombreError("Ingrese los nombres");
                valid = false;
            } else {
                setNombreError("");
            }
            if (apellidos == null || apellidos == "") {
                setApellidosError("Ingrese los apellidos");
                valid = false;
            } else {
                setApellidosError("");
            }
            if (numero_contacto == null ||numero_contacto == "") {
                setNumero_contactoError("Ingrese numero de contacto");
                valid = false;
            } else {
                setNumero_contactoError("");
            }
            if (edad_minima <= 0) {
                var fechaActual = new Date();
                var fechaActual1 = new Date();
                fechaActual1.setDate(fechaActual.getDate() - 365);
                if (date.getTime() > fechaActual1.getTime()) {
                    setDateError("Ingrese una fecha de nacimiento mayor a un año del dia actual")
                    valid = false;
                } else {
                    setDateError("");
                }
            }
            else {
                var fecha_minima = new Date();
                var fecha_minima2 = new Date();
                fecha_minima2.setDate(fecha_minima.getDate() -365*edad_minima);
                if (date.getTime() > fecha_minima2.getTime()) {
                    setDateError("Ingrese una fecha de nacimiento mayor a "+ String(edad_minima) +" años del dia actual")
                    valid = false;
                } else {
                    setDateError("");
                }
            }
            if (previsionChecked == null ||previsionChecked == "") {
                setPrevisionCheckedError("Seleccione una opcion de este campo");
                valid = false;
            } else {
                setPrevisionCheckedError("");
            }
            if (distritoChecked == null || distritoChecked == "") {
                setDistritoCheckedError("Seleccione una opcion de este campo");
                valid = false;
            } else {
                setDistritoCheckedError("");
            }
            if (correos == null || correos == "") {
                //setCorreosError("Ingrese al menos un correo");
                valid = true;
            } else {
                //validacion correo 2
                var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //expresion regular para validar email
                var arrayCorreos1 = correos.split(',')
                var arrayCorreos2 = [];
                var mapValidoCorreo = 0;
                arrayCorreos1.map(((correo) => {
                    var nuevoCorreo = correo.trim();
                    arrayCorreos2.push(nuevoCorreo);
                    var esValido = 0;
                    if (regexEmail.test(nuevoCorreo)) { //tendra un arroba @ y sera valido? si lo es entra aqui
                        for (var correoValido in listaValidacionCorreo) { // el ciclo para cuando encuentra un dominio valido para el correo
                            var dominio = nuevoCorreo.split("@");
                            //console.log("dominio ingresado: ", dominio[1]);
                            //console.log("validar: ", listaValidacionCorreo[correoValido]);
                            if (dominio[1] == listaValidacionCorreo[correoValido]) { //se encuentra el correo valido
                                setCorreosError("");
                                esValido = 1;
                                break;
                            }
                        }
                        if (esValido == 0) { //no se encontro un dominio de correo valido dentro de los que existen
                            setCorreosError("El/Los correos no son validos");
                            valid = false;
                            mapValidoCorreo = 1;
                            return;
                        }
                    } else { //en caso que hayan mas de un @
                        if (mapValidoCorreo == 0) {
                            mapValidoCorreo = 1; //no es valido
                        }
                    }
                }));
                if (mapValidoCorreo == 1) {
                    setCorreosError("El/Los correos no son validos");
                    valid = false;
                } else {
                    setCorreosError("");
                }
            }
            
            if (numero == null || numero == "") {
                setNumero("-1")
            }
            if (poblacion == null || poblacion == "") {
                setPoblacionError("Ingrese la poblacion donde vive");
                valid = false;
            } else {
                setPoblacionError("");
            }
            if (calle == null || calle == "") {
                setCalleError("Ingrese la calle donde vive");
                valid = false;
            } else {
                setCalleError("");
            }
            
            if (valid){
                showDialog(); //recien muestro el dialogo para confirmar envio
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (

        <SafeAreaView style={styles.containerVT}>

            <ScrollView>
                <View style={styles.hTituloPostulaciones}><Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'justify' }}>Usted está postulando al taller: "{nombre_actividad}"</Text></View>

                <View style={styles.itemVDT}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Ingrese su rut:  </Text>
                    <View style={styles.row}>

                        <TextInput
                            style={styles.inputCamposRut}
                            onChangeText={onChangeRut1}
                            value={rutP1}
                            placeholder="XX"
                            keyboardType="number-pad"
                        />
                        <Text style={styles.textRut}>.</Text>

                        <TextInput
                            style={styles.inputCamposRut}
                            onChangeText={onChangeRut2}
                            value={rutP2}
                            placeholder="XXX"
                            keyboardType="number-pad"
                        />
                        <Text style={styles.textRut}>.</Text>

                        <TextInput
                            style={styles.inputCamposRut}
                            onChangeText={onChangeRut3}
                            value={rutP3}
                            placeholder='XXX'
                            keyboardType='number-pad'
                        />
                        <Text style={styles.textRut}>-</Text>
                        <TextInput
                            style={styles.inputCamposRut}
                            onChangeText={onChangeRut4}
                            value={rutP4}
                            placeholder="X"
                            keyboardType="default"
                        />
                    </View>

                    {rutError.length > 0 && <Text style={{ color: 'red', fontWeight: "bold", textAlign: "center", fontSize: 20 }}>{rutError}</Text>}

                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Ingrese sus nombres: </Text>
                    <TextInput
                        style={styles.inputNombreCompleto}
                        onChangeText={onChangeNombres}
                        value={nombres}
                        placeholder="Ejemplo: Maria Juana"
                        keyboardType="default"
                    />
                    {nombreError.length > 0 && <Text style={{ color: 'red', fontWeight: "bold", textAlign: "center", fontSize: 20 }}>{nombreError}</Text>}
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Ingrese sus apellidos: </Text>
                    <TextInput
                        style={styles.inputNombreCompleto}
                        onChangeText={onChangeApellidos}
                        value={apellidos}
                        placeholder="Ejemplo: Gonzales Figueroa"
                        keyboardType="default"
                    />
                    {apellidosError.length > 0 && <Text style={{ color: 'red', fontWeight: "bold", textAlign: "center", fontSize: 20 }}>{apellidosError}</Text>}
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Ingrese su número telefónico (celular): </Text>

                    <View style={styles.row}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, top: 15, start: 10 }}>+569  </Text>
                        <TextInput
                            style={styles.inputNumeroContacto}
                            onChangeText={onChangeNumeroContacto}
                            value={numero_contacto}
                            placeholder="Ejemplo: 12345678"
                            keyboardType="number-pad"
                        />
                    </View>
                    {numero_contactoError.length > 0 && <Text style={{ color: 'red', fontWeight: "bold", textAlign: "center", fontSize: 20 }}>{numero_contactoError}</Text>}

                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, textAlign: 'justify' }}>Ingrese su fecha de nacimiento, presionando el botón blanco del calendario:</Text>
                    
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}

                    <View style={styles.row}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, top: 15, start: 10 }}>Fecha seleccionada:  </Text>
                        <TextInput
                            style={styles.inputNumeroContacto}
                            onChangeText={setDate}
                            value={String(date.toISOString()).substring(0, 10)}
                            placeholder=" YYYY/MM/DD"
                            keyboardType="default"
                            editable={false}
                        />
                           <Ionicons onPress={showDatepicker} size ={28} name="md-calendar" color="ghostwhite" style={{top:11, start:2}}/>

                    </View>
                    {dateError.length > 0 && <Text style={{ color: 'red', fontWeight: "bold", textAlign: "center", fontSize: 20 }}>{dateError}</Text>}


                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Seleccione su previsión de salud, de no tener, seleccione "Sin previsión":</Text>

                    <View style={styles.row}>
                        <RadioButton
                            value="Fonasa"
                            status={previsionChecked === 'Fonasa' ? 'checked' : 'unchecked'}
                            onPress={() => setPrevisionChecked('Fonasa')}
                        />
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, top: 5 }}>Fonasa</Text>

                        <RadioButton
                            value="ISAPRES"
                            status={previsionChecked === 'ISAPRES' ? 'checked' : 'unchecked'}
                            onPress={() => setPrevisionChecked('ISAPRES')}
                        />
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, top: 5 }}>ISAPRES</Text>

                        <RadioButton
                            value="Sin previsión"
                            status={previsionChecked === 'Sin previsión' ? 'checked' : 'unchecked'}
                            onPress={() => setPrevisionChecked('Sin previsión')}
                        />
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, top: 5 }}>Sin previsión</Text>


                    </View>
                    {previsionCheckedError.length > 0 && <Text style={{ color: 'red', fontWeight: "bold", textAlign: "center", fontSize: 20 }}>{previsionCheckedError}</Text>}

                    <View>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Ingrese su(s) correo(s) (opcional): </Text>
                        <TextInput
                            style={styles.inputCorreo}
                            multiline={true}
                            placeholder={"Para poner más de un correo, separe con una coma para ingresar otros.\nEjemplo:\nmartin@gmail.com, martinix_pro@gmail.com, mp123@hotmail.com"}
                            onChangeText={setCorreos}
                            value={correos}
                        />
                    </View>
                    {correosError.length > 0 && <Text style={{ color: 'red', fontWeight: "bold", textAlign: "center", fontSize: 20 }}>{correosError}</Text>}

                    <View style={styles.hSubseccionLocalidad}><Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'justify' }}>Datos de su localidad</Text></View>
                    <View>
                        <View>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Seleccione su distrito: </Text>
                            <View style={styles.row}>
                                <RadioButton
                                    value="Distrito mayor Urbano"
                                    status={distritoChecked === 'Distrito mayor Urbano' ? 'checked' : 'unchecked'}
                                    onPress={() => setDistritoChecked('Distrito mayor Urbano')}
                                />
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, top: 5 }}>Distrito mayor Urbano</Text>
                            </View>

                            <View style={styles.row}>
                                <RadioButton
                                    value="Distrito mayor Valle Alegre"
                                    status={distritoChecked === 'Distrito mayor Valle Alegre' ? 'checked' : 'unchecked'}
                                    onPress={() => setDistritoChecked('Distrito mayor Valle Alegre')}
                                />
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, top: 5 }}>Distrito mayor Valle Alegre</Text>
                            </View>

                            <View style={styles.row}>
                                <RadioButton
                                    value="Distrito mayor Dumuño"
                                    status={distritoChecked === 'Distrito mayor Dumuño' ? 'checked' : 'unchecked'}
                                    onPress={() => setDistritoChecked('Distrito mayor Dumuño')}
                                />
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, top: 5 }}>Distrito mayor Dumuño</Text>
                            </View>

                        </View>
                        {distritoCheckedError.length > 0 && <Text style={{ color: 'red', fontWeight: "bold", textAlign: "center", fontSize: 20 }}>{distritoCheckedError}</Text>}


                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Ingrese el número de casa/departamento: </Text>
                        <TextInput
                            style={styles.inputNumero}
                            placeholder={"Ejemplo: 619"}
                            onChangeText={setNumero}
                            value={numero}
                            keyboardType="number-pad"
                        />
                        {numeroError.length > 0 && <Text style={{ color: 'red', fontWeight: "bold", textAlign: "center", fontSize: 20 }}>{numeroError}</Text>}

                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Ingrese su barrio: </Text>
                        <TextInput
                            style={styles.inputPoblacion}
                            placeholder={"Ejemplo: Loncura"}
                            onChangeText={setPoblacion}
                            value={poblacion}
                        />
                        {poblacionError.length > 0 && <Text style={{ color: 'red', fontWeight: "bold", textAlign: "center", fontSize: 20 }}>{poblacionError}</Text>}

                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Ingrese la calle donde reside: </Text>
                        <TextInput
                            style={styles.inputPoblacion}
                            placeholder={"Ejemplo: Calle nueva #372"}
                            onChangeText={setCalle}
                            value={calle}
                        />
                        {calleError.length > 0 && <Text style={{ color: 'red', fontWeight: "bold", textAlign: "center", fontSize: 20 }}>{calleError}</Text>}


                    </View>

                    <View>
                        <Dialog.Container visible={visible}>
                            <Dialog.Title>Confirmar formulario</Dialog.Title>
                            <Dialog.Description>
                                Usted al ingresar al taller, debe estar consciente de que no puede volver a registrarse con el  mismo RUT a éste , por lo cual debe verificar sus datos de forma correcta, ¿Está seguro/a de querer continuar?
                            </Dialog.Description>
                            <Dialog.Button label="Cancelar" onPress={handleCancel} />
                            <Dialog.Button label="Confirmar" onPress={() => handleConfirm()} />
                        </Dialog.Container>
                    </View>


                    <Pressable style={styles.buttonPostular} onPress={validForm}>
                        <Text style={styles.text}>Postular</Text>
                    </Pressable>

                </View>

            </ScrollView>
        </SafeAreaView >
    );
                    }

async function getInfo(codigo_actividad, rutP1, rutP2, rutP3, rutP4, nombres, apellidos, numero_contacto, date, previsionChecked, correos, distritoChecked, numero, poblacion, calle) {

    var jsonPostulacionInfo = {};
    var rut = String(rutP1) + "." + String(rutP2) + "." + String(rutP3) + "-" + String(rutP4);
    var numero_contacto_final = "+569" + String(numero_contacto);
    var fecha_nac = String(date.toISOString()).substring(0, 10);
    var arrayCorreos2 = [];
    if (correos == null || correos == "") {
        
    }else{    
        var arrayCorreos1 = correos.split(',');
        arrayCorreos1.map(((correo) => {
            var nuevoCorreo = correo.trim();
            arrayCorreos2.push(nuevoCorreo);
        }));
        }
    var numeroNuevoDepaCasa = String(numero);
    jsonPostulacionInfo.rut = rut;
    jsonPostulacionInfo.nombres = nombres;
    jsonPostulacionInfo.apellidos = apellidos;
    jsonPostulacionInfo.numero_contacto_final = numero_contacto_final;
    jsonPostulacionInfo.fecha_nac = fecha_nac;
    jsonPostulacionInfo.previsionChecked = previsionChecked;
    jsonPostulacionInfo.arrayCorreos = arrayCorreos2;
    jsonPostulacionInfo.distritoChecked = distritoChecked;
    jsonPostulacionInfo.numeroNuevoDepaCasa = numeroNuevoDepaCasa;
    jsonPostulacionInfo.poblacion = poblacion;
    jsonPostulacionInfo.calle = calle;
    jsonPostulacionInfo.codigo_actividad = codigo_actividad;


    var res = await setDatosPostulacion(jsonPostulacionInfo);
    var checked = false;
    if(res.res=="concretado"){
        checked = true
        return checked;
        
    }else{
        return checked;
    }



}


export { VistaPostulacion };