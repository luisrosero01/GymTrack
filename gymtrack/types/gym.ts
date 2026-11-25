export type DiaSemana = 'lunes'|'martes'|'miercoles'|'jueves'|'viernes'|'sabado';
export type GrupoMuscular = 'pierna'|'pecho'|'triceps'|'espalda'|'hombro'|'biceps'|'abdomen'|'cadera'|'gluteo'|'lumbar'|'antebrazo';
export interface Ejercicio {id:string;nombre:string;grupo:GrupoMuscular;series:number;repeticiones:number;imagen?:number}
export interface DiaPlan {dia:DiaSemana;enfoque:string;color:string;ejercicios:string[];cardioMin?:number}
export type Perimetro = 'hombro'|'brazo'|'antebrazo'|'pecho'|'abdomen'|'cadera'|'pierna'|'pantorrilla';
export interface Medida {mes:string;estaturaM:number;pesoKg:number;perimetrosCm:Partial<Record<Perimetro,number>>}
export interface Socio {nombre:string;edad:number;fechaAsignacion:string;objetivo:string;observaciones:string[];lesiones:GrupoMuscular[];medidas:Medida[]}
