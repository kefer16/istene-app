# Gamertec - FrontEnd APP

Aplicación Móvil del ISTENE para registro de postulantes

## Previsualización

previsualización de `despliegue utilizando Expo y Emulador de Android Studio`

- Pantalla Login

![Imagen despliegue Principal](./public/images/login.png)

## Generar carpeta android

para poder generar la carpeta android:

```bash
npx expo prebuild
```
## Limpiar Cache

limpiar cache de dispositivo (variables de entorno)

```bash
npx expo start --clear
```
## Generar APK o AAB 

generar Nuevo Project Id:
```bash
eas int
```
generar apk con el perfil de preview:
```bash
eas build -p android --profile preview
```
## Configurar expo-env.d.ts

agregar el siguiente codigo con la siguiente estructura

```js
declare module "@env" {
   export const API_URL: string;
   export const DEBUG_MODE: boolean;
}
```

## Crear estrutura de componente

abreviatura para crear el componente incial deacuerdo al nombre del archivo

```js
rnfe
```

```bash
npx expo start --web --clear
```


