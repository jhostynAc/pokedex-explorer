# PokéDex Explorer 

Este proyecto es una aplicación móvil desarrollada en React Native que consume la PokéAPI. Para asegurar un código limpio, escalable y fácil de mantener, el proyecto se estructuró bajo el principio de **Separación de Responsabilidades**.

A continuación, se detalla la arquitectura de carpetas y la función específica de cada módulo.

```text
src/
├── components/
│   ├── CardList.js
│   ├── CardPoke.js
│   └── EstadoVacio.js
│
├── navigation/
│   └── PokemonsStack.js
│
├── screens/
│   ├── DetallesPokeScreen.js
│   └── HomenScreen.js
│
├── services/
│   └── pokeAppi.js
│
└── theme/
    └── index.js

components/: Se encarga de almacenar los componentes visuales reutilizables de la interfaz.

CardList.js: Tarjeta individual utilizada para renderizar cada Pokémon en la lista de la pantalla principal.

CardPoke.js: Componente que dibuja la tarjeta detallada (estadísticas, tipos y medidas) y se utiliza en la pantalla de detalles.

EstadoVacio.js: Pantalla o mensaje de retroalimentación que se le muestra al usuario cuando el buscador no encuentra resultados que coincidan con su petición.

navigation/: Gestiona las rutas de navegación de la PokéDex Explorer. Aquí se configuran las transiciones y el flujo (Stack Navigator) entre las pantallas principales de la aplicación.

screens/: Es la encargada de mostrar las vistas completas de la aplicación (HomenScreen y DetallesPokeScreen). En estos archivos se hace el respectivo llamado y ensamblaje de los componentes creados en la carpeta components/.

services/: Encargada exclusivamente de hacer las peticiones HTTP y las llamadas a la API externa (PokéAPI). Aquí se procesan y mapean los datos antes de enviarlos a las vistas.

theme/: Define los estilos globales de la aplicación. Centraliza paletas de colores (incluyendo colores dinámicos por tipo de Pokémon), tipografías y espaciados para mantener consistencia visual.

Se organizó de esta manera para que, si en un futuro se requiere agregar nuevas funcionalidades, el proyecto sea fácil de mantener y escalar.