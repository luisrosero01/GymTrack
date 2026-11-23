# GymTrack - Laboratorio integrado final

Aplicación móvil desarrollada con Expo Router, React Native y TypeScript para digitalizar la ficha de entrenamiento de un gimnasio.

## Integrantes
- Luis Rafael
- Pendiente de completar si el laboratorio se entrega por pareja.

## Entorno requerido
- Node.js 24 LTS
- Expo SDK 57: `"expo": "~57.0.34"`
- Expo Go compatible con SDK 57
- npm

## Instalación
```bash
npm install
npx expo install --check
npx tsc --noEmit
npx expo lint
npx expo start --clear
```
Escanea el QR con Expo Go. `npx expo install --fix` alinea versiones compatibles con la versión exacta de Expo instalada.

## Estado de requisitos
| Requisito | Estado |
|---|---|
| RF01 Plan semanal de 6 días con color y día actual | Cumplido |
| RF02 Detalle del día y calentamientos | Cumplido |
| RF03 Catálogo de 11 grupos musculares | Cumplido |
| RF04 Filtro por nombre sin mayúsculas ni tildes | Cumplido |
| RF05 Detalle de ejercicio, grupo, esquema y días asignados | Cumplido con marcador visual |
| RF06 Sesiones completadas y barra de progreso | Cumplido |
| RF07 Perfil controlado y validado | Cumplido |
| RF08 Mes, estatura, peso, perímetros e IMC | Cumplido |
| RF09 Advertencias por lesión | Cumplido |
| RF10 Temporizador de descanso de 60 segundos | Cumplido |
| RF11 Persistencia con AsyncStorage | Cumplido |

## Capturas
Pendientes de adjuntar al README antes de entregar: Inicio, Catálogo, Medidas y Perfil.

## Video demostrativo
Pendiente: grabación menor de 5 minutos mostrando RF01-RF08 en un dispositivo.

## Bitácora de investigación
| Tema | Fuentes consultadas | Aprendizaje aplicado |
|---|---|---|
| T1 Context | https://react.dev/reference/react/useContext | `createContext`, `Provider`, `useContext` y `useGym` permiten compartir perfil, medidas y sesiones sin prop drilling. El hook lanza un error si se usa fuera del provider. Aplicado en `context/GymContext.tsx`. |
| T2 Expo Router | https://docs.expo.dev/router/introduction/ y https://docs.expo.dev/router/advanced/tabs/ | Los grupos `(tabs)` crean pestañas y los archivos `[dia].tsx`, `[grupo].tsx` y `[id].tsx` crean rutas dinámicas. Aplicado en `app/`. |
| T3 useEffect | https://react.dev/reference/react/useEffect | `useEffect` inicia y limpia `setInterval` según el estado activo. La limpieza evita intervalos al salir de la pantalla. Aplicado en `app/ejercicio/[id].tsx`. |
| T4 Formularios | https://reactnative.dev/docs/textinput y https://reactnative.dev/docs/keyboardavoidingview | Los formularios usan estado controlado, `keyboardType`, conversiones numéricas y mensajes de error. Aplicado en perfil y medidas. |
| T5 Diseño adaptable | https://reactnative.dev/docs/safe-area-view y https://reactnative.dev/docs/flexbox | SafeAreaView protege el contenido y `useWindowDimensions` cambia la cuadrícula entre 2 y 3 columnas. Aplicado en pantallas y componentes. |
| T6 TypeScript y arreglos | https://www.typescriptlang.org/docs/handbook/2/narrowing.html | `map`, `filter`, `find`, `Record`, tipos unión y estrechamiento tipan el dominio y encuentran los días de un ejercicio. `normalize('NFD')` elimina tildes para buscar. |
| T7 Imágenes locales | https://reactnative.dev/docs/images | Se usa un marcador visual porque el proyecto no incluye el conjunto de recursos. Las imágenes locales deben registrarse con `require` y no con rutas dinámicas construidas como texto. |
| T8 AsyncStorage | https://react-native-async-storage.github.io/async-storage/docs/usage/ | `getItem`, `setItem`, `JSON.stringify` y `JSON.parse` permiten persistir perfil, medidas y sesiones. No es apropiado para secretos. Aplicado en `GymContext.tsx`. |

## Reflexión técnica
Se decidió centralizar el estado compartido en `GymContext` para que perfil, medidas y sesiones estuvieran disponibles en todas las rutas sin pasar props entre varios niveles. La dificultad principal fue validar datos heterogéneos recibidos como texto y persistirlos sin romper el modelo tipado; se resolvió usando conversiones explícitas, guardas y tipos como `Record<Perimetro, number>`.

Se utilizó Copilot SDK / GitHub Copilot como herramienta de apoyo para implementar y revisar componentes, corregir errores de compilación y comparar el proyecto con la guía. El estudiante debe comprender y poder explicar todo el código durante la sustentación.
