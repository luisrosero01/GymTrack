import React,{createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Socio,Medida,DiaSemana} from '@/types/gym';
import {socioInicial} from '@/data/socio';
type Completados=Record<DiaSemana,string[]>;
interface GymState {socio:Socio;setSocio:(s:Socio)=>void;medidas:Medida[];agregarMedida:(m:Medida)=>Promise<boolean>;completados:Completados;alternarEjercicio:(dia:DiaSemana,id:string)=>void;listo:boolean}
const vacio:Completados={lunes:[],martes:[],miercoles:[],jueves:[],viernes:[],sabado:[]};
const GymContext=createContext<GymState|null>(null);
export function GymProvider({children}:{children:ReactNode}){
 const [socio,setSocio]=useState<Socio>(socioInicial);
 const [medidas,setMedidas]=useState<Medida[]>([]);
 const [completados,setCompletados]=useState<Completados>(vacio);
 const [listo,setListo]=useState(false);
 useEffect(()=>{let activo=true;(async()=>{try{const s=await AsyncStorage.getItem('gymtrack-v1');if(s&&activo){const parsed:unknown=JSON.parse(s);if(parsed&&typeof parsed==='object'){const data=parsed as {socio?:Socio;medidas?:Medida[];completados?:Completados};if(data.socio)setSocio(data.socio); if(Array.isArray(data.medidas)){
  const medidasGuardadas=data.medidas.filter(m=>{
   const esNoviembrePredeterminado=m.mes==='2026-11'&&m.pesoKg===98&&m.estaturaM===1.75;
   const esOctubrePredeterminado=m.mes==='2026-10'&&m.pesoKg===100.5&&m.estaturaM===1.75;
   return !esNoviembrePredeterminado&&!esOctubrePredeterminado;
  });
  setMedidas(medidasGuardadas);
 }if(data.completados)setCompletados(data.completados)}}}catch(e){console.warn('No se pudo recuperar el almacenamiento',e)}finally{if(activo)setListo(true)}})();return()=>{activo=false}},[]);
 useEffect(()=>{if(!listo)return;AsyncStorage.setItem('gymtrack-v1',JSON.stringify({socio,medidas,completados})).catch(console.warn)},[socio,medidas,completados,listo]);
 const agregarMedida=async(m:Medida):Promise<boolean>=>{
  const nuevasMedidas=[m,...medidas.filter(x=>x.mes!==m.mes)].sort((a,b)=>b.mes.localeCompare(a.mes));
  setMedidas(nuevasMedidas);
  try{
   await AsyncStorage.setItem('gymtrack-v1',JSON.stringify({socio,medidas:nuevasMedidas,completados}));
   return true;
  }catch(e){
   console.warn('No se pudo guardar la medida',e);
   return false;
  }
 };
 const alternarEjercicio=(dia:DiaSemana,id:string)=>setCompletados(prev=>({...prev,[dia]:prev[dia].includes(id)?prev[dia].filter(x=>x!==id):[...prev[dia],id]}));
 return <GymContext.Provider value={{socio,setSocio,medidas,agregarMedida,completados,alternarEjercicio,listo}}>{children}</GymContext.Provider>
}
export function useGym():GymState{const ctx=useContext(GymContext);if(!ctx)throw new Error('useGym debe usarse dentro de GymProvider');return ctx}
