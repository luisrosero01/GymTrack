import React from 'react';
import {Text,TextInput,View,type TextInputProps} from 'react-native';
import {C} from '@/constants/colores';

interface CampoFormularioProps extends TextInputProps {
  etiqueta:string;
  error?:string;
}

export function CampoFormulario({etiqueta,error,...props}:CampoFormularioProps){
  return <View style={{marginBottom:12}}>
    <Text style={{fontSize:14,fontWeight:'700',color:C.texto,marginBottom:6}}>{etiqueta}</Text>
    <TextInput
      {...props}
      placeholderTextColor="#8B8292"
      style={[
        {borderWidth:1,borderColor:error?'#E11D48':C.borde,borderRadius:11,backgroundColor:'white',minHeight:48,paddingHorizontal:12,fontSize:16,color:C.texto},
        props.style,
      ]}
    />
    {error?<Text style={{color:'#BE123C',marginTop:4,fontSize:14}}>{error}</Text>:null}
  </View>
}
