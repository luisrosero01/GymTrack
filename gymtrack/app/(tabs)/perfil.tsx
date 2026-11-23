import React,{useState} from 'react';
import {ScrollView,Alert,Text,View,Pressable,KeyboardAvoidingView,Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {Pantalla,Boton} from '@/components/UI';
import {CampoFormulario} from '@/components/CampoFormulario';
import {useGym} from '@/context/GymContext';
import {grupos} from '@/data/ejercicios';
import type {GrupoMuscular} from '@/types/gym';
import {C} from '@/constants/colores';

export default function Perfil(){
  const {socio,setSocio}=useGym();
  const [editando,setEditando]=useState(false);
  const [nombre,setNombre]=useState(socio.nombre);
  const [edad,setEdad]=useState(String(socio.edad));
  const [objetivo,setObjetivo]=useState(socio.objetivo);
  const [observaciones,setObservaciones]=useState(socio.observaciones.join('\n'));
  const [lesiones,setLesiones]=useState(socio.lesiones.join(', '));
  const [errores,setErrores]=useState<{nombre?:string;edad?:string;lesiones?:string}>({});

  const guardar=()=>{
    const e:typeof errores={};
    if(!nombre.trim())e.nombre='El nombre es obligatorio';
    if(!/^\d+$/.test(edad.trim())||Number(edad)<14||Number(edad)>90)e.edad='La edad debe ser un entero entre 14 y 90';
    const ls=lesiones.split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);
    if(ls.some(x=>!grupos.some(g=>g===x)))e.lesiones='Usa grupos válidos separados por comas';
    setErrores(e);
    if(Object.keys(e).length)return;
    setSocio({...socio,nombre:nombre.trim(),edad:Number(edad),objetivo:objetivo.trim(),observaciones:observaciones.split('\n').map(x=>x.trim()).filter(Boolean),lesiones:ls as GrupoMuscular[]});
    setEditando(false);
    Alert.alert('Guardado','Perfil actualizado correctamente');
  };

  return <SafeAreaView edges={['bottom']} style={{flex:1}}><Pantalla><KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':undefined} style={{flex:1}}><ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
    <View style={{alignItems:'center',marginBottom:14}}>
      <View style={{width:94,height:94,borderRadius:47,backgroundColor:'#F4D6B8',alignItems:'center',justifyContent:'center',borderWidth:3,borderColor:'white',marginBottom:8}}>
        <Ionicons name="person" size={54} color="#4A345F"/>
      </View>
      <Text style={{fontSize:20,fontWeight:'900',color:C.texto}}>{socio.nombre}</Text>
      <Text style={{fontSize:15,color:C.gris,marginTop:3}}>{socio.edad} años</Text>
    </View>
    {!editando?<View>
      <View style={{backgroundColor:'white',borderRadius:14,padding:14,marginBottom:10,borderWidth:1,borderColor:C.borde,flexDirection:'row',alignItems:'center'}}>
        <View style={{width:38,height:38,borderRadius:19,backgroundColor:'#E9E2FF',alignItems:'center',justifyContent:'center',marginRight:10}}><Ionicons name="trophy" size={20} color={C.primario}/></View>
        <View style={{flex:1}}><Text style={{fontSize:14,fontWeight:'800',color:C.texto}}>Objetivo</Text><Text style={{color:C.gris}}>{socio.objetivo}</Text></View>
      </View>
      <View style={{backgroundColor:'white',borderRadius:14,padding:14,marginBottom:10,borderWidth:1,borderColor:C.borde,flexDirection:'row',alignItems:'center'}}>
        <View style={{width:38,height:38,borderRadius:19,backgroundColor:'#FFEEEE',alignItems:'center',justifyContent:'center',marginRight:10}}><Ionicons name="heart" size={20} color="#FF5A67"/></View>
        <View style={{flex:1}}><Text style={{fontSize:14,fontWeight:'800',color:C.texto}}>Condición médica</Text><Text style={{color:C.gris}}>{socio.observaciones.length?'Registrada':'Ninguna'}</Text></View>
      </View>
      <View style={{backgroundColor:'white',borderRadius:14,padding:14,marginBottom:10,borderWidth:1,borderColor:C.borde,flexDirection:'row',alignItems:'center'}}>
        <View style={{width:38,height:38,borderRadius:19,backgroundColor:'#EEE9FF',alignItems:'center',justifyContent:'center',marginRight:10}}><Ionicons name="bandage" size={20} color={C.primario}/></View>
        <View style={{flex:1}}><Text style={{fontSize:14,fontWeight:'800',color:C.texto}}>Lesiones previas</Text><Text style={{color:C.gris}}>{socio.lesiones.join(', ')||'Ninguna'}</Text></View>
      </View>
      <Pressable onPress={()=>setEditando(true)} style={{backgroundColor:'white',borderRadius:14,padding:14,marginBottom:10,borderWidth:1,borderColor:C.borde,flexDirection:'row',alignItems:'center'}}>
        <Ionicons name="person-outline" size={20} color={C.primario}/><Text style={{flex:1,marginLeft:10,fontWeight:'800',color:C.texto}}>Editar datos</Text><Ionicons name="chevron-forward" size={20} color={C.primario}/>
      </Pressable>
      <View style={{backgroundColor:'white',borderRadius:14,padding:14,marginBottom:10,borderWidth:1,borderColor:C.borde,flexDirection:'row',alignItems:'center'}}>
        <Ionicons name="newspaper-outline" size={20} color={C.primario}/><Text style={{marginLeft:10,fontWeight:'800',color:C.texto}}>Observaciones</Text>
      </View>
      <Pressable onPress={()=>Alert.alert('Sesión','Has cerrado la sesión')} style={{backgroundColor:'white',borderRadius:14,padding:14,borderWidth:1,borderColor:C.borde,flexDirection:'row',alignItems:'center'}}>
        <Ionicons name="log-out-outline" size={20} color="#EF4444"/><Text style={{marginLeft:10,fontWeight:'800',color:'#EF4444'}}>Cerrar sesión</Text>
      </Pressable>
    </View>:<View>
      <CampoFormulario etiqueta="Nombre" value={nombre} onChangeText={setNombre} error={errores.nombre}/>
      <CampoFormulario etiqueta="Edad" value={edad} onChangeText={setEdad} keyboardType="numeric" error={errores.edad}/>
      <CampoFormulario etiqueta="Objetivo" value={objetivo} onChangeText={setObjetivo}/>
      <CampoFormulario etiqueta="Observaciones médicas (una por línea)" value={observaciones} onChangeText={setObservaciones} multiline style={{minHeight:85,textAlignVertical:'top'}}/>
      <CampoFormulario etiqueta="Grupos con lesiones (separados por comas)" value={lesiones} onChangeText={setLesiones} error={errores.lesiones}/>
      <Text style={{fontSize:13,color:C.gris,marginBottom:12}}>Grupos: {grupos.join(', ')}</Text>
      <Boton titulo="Guardar perfil" onPress={guardar}/>
      <Pressable onPress={()=>setEditando(false)} style={{height:44,alignItems:'center',justifyContent:'center'}}><Text style={{color:C.primario,fontWeight:'700'}}>Cancelar</Text></Pressable>
    </View>}
  </ScrollView></KeyboardAvoidingView></Pantalla></SafeAreaView>
}
