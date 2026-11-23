import React,{type ReactNode} from 'react';
import {View,Text,StyleSheet,Pressable,TextInput,type TextInputProps} from 'react-native';
import {C} from '@/constants/colores';
export function Pantalla({children}:{children:ReactNode}){return <View style={s.pantalla}>{children}</View>}
export function Titulo({children}:{children:ReactNode}){return <Text style={s.titulo}>{children}</Text>}
export function Tarjeta({children}:{children:ReactNode}){return <View style={s.tarjeta}>{children}</View>}
export function Boton({titulo,onPress,disabled=false}:{titulo:string;onPress:()=>void;disabled?:boolean}){return <Pressable disabled={disabled} onPress={onPress} style={[s.boton,disabled&&{opacity:.4}]}><Text style={s.botonTexto}>{titulo}</Text></Pressable>}
export function CampoFormulario({etiqueta,error,...props}:TextInputProps&{etiqueta:string;error?:string}){return <View style={{marginBottom:12}}><Text style={s.etiqueta}>{etiqueta}</Text><TextInput {...props} placeholderTextColor="#8B8292" style={[s.input,error&&{borderColor:'#E11D48'}]}/>{error?<Text style={{color:'#BE123C',marginTop:4}}>{error}</Text>:null}</View>}
export const s=StyleSheet.create({
  pantalla:{flex:1,backgroundColor:C.fondo,padding:14},
  titulo:{fontSize:24,fontWeight:'800',color:C.texto,marginBottom:14,letterSpacing:-0.3},
  tarjeta:{backgroundColor:C.blanco,borderRadius:16,padding:15,marginBottom:10,borderWidth:1,borderColor:C.borde,shadowColor:'#261A3A',shadowOpacity:.05,shadowRadius:8,shadowOffset:{width:0,height:3},elevation:2},
  boton:{backgroundColor:C.primario,padding:14,minHeight:50,borderRadius:12,alignItems:'center',justifyContent:'center',shadowColor:C.primario,shadowOpacity:.18,shadowRadius:8,shadowOffset:{width:0,height:4},elevation:3},
  botonTexto:{color:'white',fontWeight:'800',fontSize:16},
  etiqueta:{fontSize:14,fontWeight:'700',color:C.texto,marginBottom:6},
  input:{borderWidth:1,borderColor:C.borde,borderRadius:11,backgroundColor:'white',minHeight:48,paddingHorizontal:12,fontSize:16,color:C.texto},
});
