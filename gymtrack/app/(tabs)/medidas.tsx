import React,{useState} from 'react';
import {ScrollView,Text,Alert,View,KeyboardAvoidingView,Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {Pantalla,Boton} from '@/components/UI';
import {CampoFormulario} from '@/components/CampoFormulario';
import {useGym} from '@/context/GymContext';
import {calcularImc,clasificarImc} from '@/utils/imc';
import type {Perimetro,Medida} from '@/types/gym';
import {C} from '@/constants/colores';

const campos:Perimetro[]=['hombro','brazo','antebrazo','pecho','abdomen','cadera','pierna','pantorrilla'];
const iconos:Record<Perimetro,'barbell'|'body'|'speedometer'|'shirt'>={'hombro':'body','brazo':'barbell','antebrazo':'barbell','pecho':'shirt','abdomen':'speedometer','cadera':'body','pierna':'body','pantorrilla':'body'};

export default function Medidas(){
  const {medidas,agregarMedida}=useGym();
  const ordenadas=[...medidas].sort((a,b)=>b.mes.localeCompare(a.mes));
  const reciente=ordenadas[0];
  const anterior=ordenadas[1];
  const [seccion,setSeccion]=useState<'imc'|'historia'>('imc');
  const mesActual=new Date();
  const mesPredeterminado=`${mesActual.getFullYear()}-${String(mesActual.getMonth()+1).padStart(2,'0')}`;
  const [mes,setMes]=useState(mesPredeterminado);
  const [peso,setPeso]=useState('');
  const [estatura,setEstatura]=useState('');
  const [perimetros,setPerimetros]=useState<Record<Perimetro,string>>({hombro:'',brazo:'',antebrazo:'',pecho:'',abdomen:'',cadera:'',pierna:'',pantorrilla:''});
  const [error,setError]=useState('');

  const guardar=async()=>{
    const kg=Number(peso.replace(',','.'));
    const m=Number(estatura.replace(',','.'));
    const mesNormalizado=mes.trim();
    if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(mesNormalizado)){setError('Mes inválido: utiliza AAAA-MM');return}
    if(!peso.trim()||!Number.isFinite(kg)||kg<30||kg>300){setError('Peso entre 30 y 300 kg');return}
    if(!estatura.trim()||!Number.isFinite(m)||m<1||m>2.3){setError('Estatura entre 1,00 y 2,30 m');return}
    const valores={} as Partial<Record<Perimetro,number>>;
    for(const c of campos){
      const v=perimetros[c].trim();
      if(!v)continue;
      const n=Number(v.replace(',','.'));
      if(!Number.isFinite(n)||n<=0||n>300){setError(`Perímetro ${c}: escribe un valor entre 0 y 300 cm`);return}
      valores[c]=n;
    }
    const nueva:Medida={mes:mesNormalizado,pesoKg:kg,estaturaM:m,perimetrosCm:valores};
    const guardado=await agregarMedida(nueva);
    if(!guardado){setError('No se pudo guardar el registro. Revisa el almacenamiento del dispositivo');return}
    setMes(mesPredeterminado);setPeso('');setEstatura('');
    setPerimetros({hombro:'',brazo:'',antebrazo:'',pecho:'',abdomen:'',cadera:'',pierna:'',pantorrilla:''});setError('');
    setSeccion('historia');
    Alert.alert('Guardado','Medida mensual registrada');
  };

  const imc=reciente?calcularImc(reciente.pesoKg,reciente.estaturaM):0;
  const estadoImc=reciente?clasificarImc(imc):'';
  const esNormal=estadoImc==='Normal';
  return <SafeAreaView edges={['bottom']} style={{flex:1}}><Pantalla><KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':undefined} style={{flex:1}}><ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
    <View style={{flexDirection:'row',backgroundColor:'#DDD5EB',borderRadius:22,height:44,padding:3,marginBottom:12}}>
      {(['imc','historia'] as const).map(x=><View key={x} style={{flex:1}}><Text onPress={()=>setSeccion(x)} style={{height:38,borderRadius:19,textAlign:'center',textAlignVertical:'center',lineHeight:38,fontWeight:'800',color:seccion===x?'white':C.primario,backgroundColor:seccion===x?C.primario:'#FFFFFF'}}>{x==='imc'?'IMC':'Historia'}</Text></View>)}
    </View>
    {seccion==='imc'?<>
      {reciente?<View style={{backgroundColor:'white',borderRadius:16,padding:16,borderWidth:1,borderColor:C.borde,alignItems:'center',marginBottom:12}}>
        <Text style={{fontSize:15,fontWeight:'800',color:C.texto,marginBottom:8}}>Tu Índice de Masa Corporal</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={{fontSize:38,fontWeight:'900',color:C.texto,marginRight:10}}>{imc.toFixed(1)}</Text>
          <Text style={{backgroundColor:esNormal?'#BCECCB':'#FFE0A8',color:esNormal?'#246D43':'#8A5A00',paddingHorizontal:12,paddingVertical:6,borderRadius:14,fontWeight:'800',overflow:'hidden'}}>{estadoImc}</Text>
        </View>
        <View style={{height:8,backgroundColor:'#D8CFF1',borderRadius:5,width:'92%',marginTop:14}}><View style={{height:8,width:50,borderRadius:5,backgroundColor:C.primario}}/></View>
        <Text style={{fontSize:13,color:C.gris,marginTop:8}}>{clasificarImc(imc)}</Text>
        {anterior?<Text style={{fontSize:14,fontWeight:'700',color:C.gris,marginTop:8}}>Cambio frente al mes anterior: {(reciente.pesoKg-anterior.pesoKg).toFixed(1)} kg</Text>:null}
      </View>:null}
      <Text style={{fontSize:17,fontWeight:'800',color:C.texto,marginBottom:10}}>Registrar medida</Text>
      <CampoFormulario etiqueta="Mes (AAAA-MM)" placeholder={mesPredeterminado} value={mes} onChangeText={setMes}/>
      {[
        ['peso','Peso (kg)',peso,setPeso],
        ['estatura','Estatura (m)',estatura,setEstatura],
      ].map(([icon,label,value,onChange])=><View key={String(icon)} style={{marginBottom:0}}><CampoFormulario etiqueta={String(label)} value={String(value)} onChangeText={onChange as (v:string)=>void} keyboardType="decimal-pad"/></View>)}
      {campos.map(c=><CampoFormulario key={c} etiqueta={`${c.charAt(0).toUpperCase()+c.slice(1)} (cm)`} value={perimetros[c]} onChangeText={v=>setPerimetros(prev=>({...prev,[c]:v}))} keyboardType="decimal-pad"/>)}
      {error?<Text style={{color:'#BE123C',marginBottom:10}}>{error}</Text>:null}
      <Boton titulo="Guardar registro" onPress={guardar}/>
    </>:<View>
      {ordenadas.length===0?<Text style={{color:C.gris,textAlign:'center',marginTop:20}}>Aún no tienes registros de medidas.</Text>:ordenadas.map(m=>{const valor=calcularImc(m.pesoKg,m.estaturaM);return <View key={m.mes} style={{backgroundColor:'white',borderRadius:16,padding:15,marginBottom:10,borderWidth:1,borderColor:C.borde}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}><Text style={{fontSize:17,fontWeight:'800',color:C.texto}}>{m.mes}</Text><Text style={{color:C.primario,fontWeight:'800'}}>{m.pesoKg} kg</Text></View>
        <Text style={{color:C.gris,marginTop:4}}>Estatura: {m.estaturaM} m • IMC: {valor.toFixed(1)}</Text>
        {campos.filter(c=>m.perimetrosCm[c]!==undefined).map(c=><View key={c} style={{flexDirection:'row',alignItems:'center',marginTop:7}}><Ionicons name={iconos[c]} size={14} color={C.primario}/><Text style={{marginLeft:7,color:C.gris,textTransform:'capitalize'}}>{c}: {m.perimetrosCm[c]} cm</Text></View>)}
      </View>})}
    </View>}
  </ScrollView></KeyboardAvoidingView></Pantalla></SafeAreaView>
}
