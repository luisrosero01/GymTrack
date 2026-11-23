import type { Ejercicio, GrupoMuscular } from '@/types/gym';
export const ejercicios: Ejercicio[] = [
  {
    "id": "pie-01",
    "nombre": "Media prensa 45°",
    "grupo": "pierna",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "pie-02",
    "nombre": "Extensión de cuádriceps",
    "grupo": "pierna",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "pie-03",
    "nombre": "Desplazamiento con mancuerna",
    "grupo": "pierna",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "pie-04",
    "nombre": "Curl femoral",
    "grupo": "pierna",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "pie-05",
    "nombre": "Pantorrilla sentado",
    "grupo": "pierna",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "pec-01",
    "nombre": "Press banca plano",
    "grupo": "pecho",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "pec-02",
    "nombre": "Vuelos",
    "grupo": "pecho",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "pec-03",
    "nombre": "Crossover",
    "grupo": "pecho",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "pec-04",
    "nombre": "Peck deck",
    "grupo": "pecho",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "tri-01",
    "nombre": "Extensión con mancuerna",
    "grupo": "triceps",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "tri-02",
    "nombre": "Extensión en polea",
    "grupo": "triceps",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "tri-03",
    "nombre": "Patada de tríceps",
    "grupo": "triceps",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "tri-04",
    "nombre": "Fondos",
    "grupo": "triceps",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "esp-01",
    "nombre": "Dominada colgado",
    "grupo": "espalda",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "esp-02",
    "nombre": "Jalón polea espalda",
    "grupo": "espalda",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "esp-03",
    "nombre": "Remo sentado",
    "grupo": "espalda",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "esp-04",
    "nombre": "Jalón polea al pecho",
    "grupo": "espalda",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "hom-01",
    "nombre": "Press con mancuerna",
    "grupo": "hombro",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "hom-02",
    "nombre": "Elevación lateral",
    "grupo": "hombro",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "hom-03",
    "nombre": "Elevación frontal",
    "grupo": "hombro",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "hom-04",
    "nombre": "Remo al mentón cerrado",
    "grupo": "hombro",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "hom-05",
    "nombre": "Hombro posterior",
    "grupo": "hombro",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "bic-01",
    "nombre": "Curl con barra",
    "grupo": "biceps",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "bic-02",
    "nombre": "Curl alternado de pie",
    "grupo": "biceps",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "bic-03",
    "nombre": "Predicador con barra",
    "grupo": "biceps",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "bic-04",
    "nombre": "Curl martillo",
    "grupo": "biceps",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "abd-01",
    "nombre": "Elevación de piernas",
    "grupo": "abdomen",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "abd-02",
    "nombre": "Oblicuos con dos mancuernas",
    "grupo": "abdomen",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "abd-03",
    "nombre": "Máquina abdominal",
    "grupo": "abdomen",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "cad-01",
    "nombre": "Abductor en máquina",
    "grupo": "cadera",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "cad-02",
    "nombre": "Patada lateral en polea",
    "grupo": "cadera",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "glu-01",
    "nombre": "Máquina de glúteo",
    "grupo": "gluteo",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "lum-01",
    "nombre": "Peso muerto",
    "grupo": "lumbar",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "lum-02",
    "nombre": "Hiperextensiones",
    "grupo": "lumbar",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "lum-03",
    "nombre": "Máquina lumbar",
    "grupo": "lumbar",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "ant-01",
    "nombre": "Curl de muñeca",
    "grupo": "antebrazo",
    "series": 4,
    "repeticiones": 12
  },
  {
    "id": "ant-02",
    "nombre": "Curl de muñeca invertido",
    "grupo": "antebrazo",
    "series": 4,
    "repeticiones": 12
  }
];
export const grupos: GrupoMuscular[] = ["pierna", "pecho", "triceps", "espalda", "hombro", "biceps", "abdomen", "cadera", "gluteo", "lumbar", "antebrazo"];
