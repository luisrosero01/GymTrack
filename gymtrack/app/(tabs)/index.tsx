import React from 'react';
import {Pressable,ScrollView,Text,View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {Pantalla,Titulo} from '@/components/UI';
import {TarjetaDia} from '@/components/TarjetaDia';
import {plan} from '@/data/plan';
import {ejercicios} from '@/data/ejercicios';
import {useGym} from '@/context/GymContext';
import {C} from '@/constants/colores';
import {router} from 'expo-router';

const dias=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];

export default function Inicio(){
  const {socio,completados}=useGym();
  const hoy=new Date().getDay();
  const hoyPlan=plan.find((_,i)=>i+1===hoy);
  const hoyClave=hoyPlan?.dia;
  const lista=hoyPlan?.ejercicios.map(id=>ejercicios.find(e=>e.id===id)).filter(Boolean)??[];

  return <SafeAreaView edges={['bottom']} style={{flex:1}}><Pantalla>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <Titulo>¡Hola, {socio.nombre.split(' ')[0]}!</Titulo>
        <Ionicons name="notifications-outline" size={22} color={C.primario}/>
      </View>
      <Text style={{fontSize:15,color:C.gris,marginBottom:12}}>Tu plan de entrenamiento semanal</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:14}}>
        {dias.map((dia,i)=>{
          const activo=(i+1)===hoy || (i===6&&hoy===0);
          return <View key={dia} style={{width:42,height:40,borderRadius:10,backgroundColor:activo?C.primario:'#ECE8F4',alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontWeight:'800',color:activo?'white':C.gris}}>{dia}</Text>
          </View>
        })}
      </View>
      {plan.map((p,i)=><TarjetaDia key={p.dia} plan={p} esHoy={(i+1===hoy)||(i===6&&hoy===0)}/>)}
      {hoy===0?<View style={{backgroundColor:'white',borderRadius:16,padding:18,alignItems:'center'}}><Text style={{fontSize:18,fontWeight:'800',color:C.texto}}>Domingo de descanso</Text></View>:hoyPlan?<>
        <View style={{backgroundColor:'white',borderRadius:16,padding:14,marginBottom:12,flexDirection:'row',alignItems:'center'}}>
          <View style={{width:48,height:48,borderRadius:24,backgroundColor:C.primario,alignItems:'center',justifyContent:'center',marginRight:12}}>
            <Ionicons name="barbell" size={24} color="white"/>
          </View>
          <View style={{flex:1}}>
            <Text style={{fontSize:18,fontWeight:'800',color:C.texto,textTransform:'capitalize'}}>{hoyPlan.dia}</Text>
            <Text style={{color:C.gris,fontSize:14}}>{hoyPlan.enfoque}</Text>
          </View>
          <Text style={{color:C.primario,fontWeight:'800',fontSize:13}}>{hoyClave?hoyClave in completados?`${completados[hoyClave as keyof typeof completados].length}/${lista.length}`:'0/'+lista.length:'0/0'}</Text>
        </View>
        <Text style={{fontSize:18,fontWeight:'800',color:C.texto,marginBottom:9}}>Entrenamiento de hoy</Text>
        {hoyPlan.cardioMin?<View style={{backgroundColor:'white',borderRadius:14,padding:14,marginBottom:8,borderWidth:1,borderColor:C.borde,flexDirection:'row',alignItems:'center'}}>
          <View style={{width:38,height:38,borderRadius:19,backgroundColor:'#FFE8E8',alignItems:'center',justifyContent:'center',marginRight:10}}><Ionicons name="flame" size={20} color="#FF6471"/></View>
          <Text style={{flex:1,fontWeight:'700',color:C.texto}}>Calentamiento</Text><Text style={{color:C.gris}}>{hoyPlan.cardioMin} min</Text>
        </View>:null}
        {lista.slice(0,3).map(e=><Pressable key={e!.id} onPress={()=>router.push({pathname:'/ejercicio/[id]',params:{id:e!.id}})} style={{backgroundColor:'white',borderRadius:14,padding:11,marginBottom:8,borderWidth:1,borderColor:C.borde,flexDirection:'row',alignItems:'center'}}>
          <View style={{width:42,height:42,borderRadius:8,backgroundColor:'#F2EEF8',alignItems:'center',justifyContent:'center',marginRight:10}}><Ionicons name="fitness" size={22} color={C.primario}/></View>
          <View style={{flex:1}}><Text style={{fontWeight:'800',color:C.texto}}>{e!.nombre}</Text><Text style={{color:C.gris}}>4 series × 12 repeticiones</Text></View>
          <Ionicons name="ellipse-outline" size={22} color="#C8C2D3"/>
        </Pressable>)}
        <Pressable onPress={()=>router.push({pathname:'/dia/[dia]',params:{dia:hoyPlan.dia}})} style={{backgroundColor:C.primario,height:52,borderRadius:12,alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:4}}>
          <Ionicons name="play" size={19} color="white" style={{marginRight:8}}/><Text style={{color:'white',fontWeight:'800',fontSize:16}}>Iniciar entrenamiento</Text>
        </Pressable>
      </>:null}
    </ScrollView>
  </Pantalla></SafeAreaView>
}
