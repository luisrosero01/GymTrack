import React,{useState} from 'react';
import {ScrollView,Text,TextInput,Pressable,View,useWindowDimensions} from 'react-native';
import {router} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {Pantalla,s} from '@/components/UI';
import {ItemEjercicio} from '@/components/ItemEjercicio';
import {grupos,ejercicios} from '@/data/ejercicios';
import {normalizar} from '@/utils/texto';
import {C} from '@/constants/colores';
import {useGym} from '@/context/GymContext';

export default function Catalogo(){
  const [busqueda,setBusqueda]=useState('');
  const {width}=useWindowDimensions();
  const columnas=width>600?3:2;
  const {socio}=useGym();
  const encontrados=ejercicios.filter(e=>normalizar(e.nombre).includes(normalizar(busqueda.trim())));
  return <SafeAreaView edges={['bottom']} style={{flex:1}}><Pantalla><ScrollView showsVerticalScrollIndicator={false}>
    <View style={{height:48,marginBottom:12,position:'relative'}}>
      <Ionicons name="search" size={20} color={C.primario} style={{position:'absolute',left:13,top:14,zIndex:2}}/>
      <TextInput placeholder="Buscar ejercicio..." value={busqueda} onChangeText={setBusqueda} placeholderTextColor="#85818D" style={[s.input,{paddingLeft:42,height:48}]} />
    </View>
    {busqueda.trim()?encontrados.length?encontrados.map(e=><ItemEjercicio key={e.id} ejercicio={e} advertencia={socio.lesiones.includes(e.grupo)}/>):<Text style={{color:C.gris,textAlign:'center',marginTop:20}}>Sin resultados</Text>:
      <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
        {grupos.map(g=>{const lista=ejercicios.filter(e=>e.grupo===g);return <Pressable key={g} onPress={()=>router.push({pathname:'/grupo/[grupo]',params:{grupo:g}})} style={{backgroundColor:'white',borderRadius:16,padding:12,marginBottom:10,borderWidth:1,borderColor:C.borde,alignItems:'center',justifyContent:'center',width:`${100/columnas-2}%`,minHeight:105}}>
          <View style={{width:48,height:48,borderRadius:24,backgroundColor:'#F3EEF8',alignItems:'center',justifyContent:'center',marginBottom:6}}><Ionicons name="fitness" size={25} color="#C95A4B"/></View>
          <Text style={{fontSize:15,fontWeight:'800',color:C.texto,textTransform:'capitalize',textAlign:'center'}}>{g}</Text>
          <Text style={{fontSize:13,color:C.gris}}>{lista.length} ejercicios</Text>
        </Pressable>})}
      </View>}
  </ScrollView></Pantalla></SafeAreaView>
}
