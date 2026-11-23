import React from 'react';import {Tabs} from 'expo-router';import {Ionicons} from '@expo/vector-icons';import {C} from '@/constants/colores';
type Icono='home'|'barbell'|'stats-chart'|'person';
const iconos:Record<string,Icono>={index:'home',catalogo:'barbell',medidas:'stats-chart',perfil:'person'};
export default function TabsLayout(){return <Tabs screenOptions={({route})=>({
  headerStyle:{backgroundColor:C.morado,height:92},
  headerTintColor:'white',
  headerTitleStyle:{fontWeight:'800',fontSize:17},
  headerTitleAlign:'center',
  tabBarActiveTintColor:C.primario,
  tabBarInactiveTintColor:'#85818D',
  tabBarLabelStyle:{fontSize:12,fontWeight:'700',marginTop:-4},
  tabBarStyle:{height:68,paddingTop:7,paddingBottom:8,backgroundColor:'#FFFFFF',borderTopWidth:0,shadowColor:'#000',shadowOpacity:.08,shadowRadius:8,elevation:12},
  tabBarIcon:({color,size})=><Ionicons name={iconos[route.name]||'home'} color={color} size={22}/>,
})}><Tabs.Screen name="index" options={{title:'GymTrack',headerShown:true}}/><Tabs.Screen name="catalogo" options={{title:'Catálogo de ejercicios'}}/><Tabs.Screen name="medidas" options={{title:'Medidas y progreso'}}/><Tabs.Screen name="perfil" options={{title:'Mi perfil'}}/></Tabs>}
