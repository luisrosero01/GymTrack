import type { Socio } from '@/types/gym';
export const socioInicial: Socio = {
  "nombre": "Andrés Gómez",
  "edad": 42,
  "fechaAsignacion": "2026-11-04",
  "objetivo": "Bajar de peso",
  "observaciones": [
    "Cirugía de menisco, rodilla derecha (2022)",
    "Dolor lumbar recurrente"
  ],
  "lesiones": [
    "pierna",
    "lumbar"
  ],
  "medidas": [
    {
      "mes": "2026-11",
      "estaturaM": 1.75,
      "pesoKg": 98,
      "perimetrosCm": {
        "hombro": 118,
        "brazo": 33,
        "antebrazo": 28,
        "pecho": 108,
        "abdomen": 101,
        "cadera": 106,
        "pierna": 58,
        "pantorrilla": 38
      }
    },
    {
      "mes": "2026-10",
      "estaturaM": 1.75,
      "pesoKg": 100.5,
      "perimetrosCm": {
        "hombro": 119,
        "brazo": 33,
        "antebrazo": 28,
        "pecho": 110,
        "abdomen": 104,
        "cadera": 108,
        "pierna": 59,
        "pantorrilla": 38
      }
    }
  ]
};
