# E09 · Documentar y revisar

**Tipo:** autocorrección

Mejora los comentarios, documenta con JSDoc, escribe tus primeros tests y deja sin errores de ESLint y con formato de Prettier un pequeño módulo de la biblioteca del instituto.

**CE:** RA2 g, h

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/`. A diferencia de los anteriores, no usa una imagen preparada para Dev Containers: **construye la suya** con el `Dockerfile` de esa carpeta, a partir de la imagen oficial de Node.js de **Docker Hub**, `node:24-bookworm` (tema 9, apartado 9.3.2). Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda algo más, porque descarga la imagen y la construye. Al crearse, el contenedor ejecuta `npm install`: cuando se abre, las dependencias ya están instaladas.

Ejecuta los programas en la terminal de VS Code, que ya es la del contenedor.

## Punto de partida

El módulo `biblioteca.js` exporta cuatro funciones que funcionan, pero con nombres poco claros, comentarios que no aportan nada, ningún bloque JSDoc, errores de ESLint y sin formato uniforme. `main.js` las importa y muestra unos resultados de prueba. El proyecto ya incluye `package.json` (con los scripts `start`, `test`, `lint`, `format` y `format:check`), `eslint.config.js` y `.prettierrc`.

## Requisitos

1. Ejecuta `npm run lint` (el contenedor ya ha instalado las dependencias). Pega la salida en la sección «ESLint antes de los cambios» del `README.md`.
2. **Renombra** las funciones, los parámetros y las constantes para que expliquen lo que son. Por ejemplo, `f(d)` calcula la multa por días de retraso. Cambia también los nombres en el `import` de `main.js`.
3. **Borra** los comentarios que repiten lo que dice el código.
4. Escribe un bloque **JSDoc** para cada función, con descripción, un `@param` con tipo por cada parámetro, `@returns` con tipo y un `@example`. Documenta también las constantes con `@type`.
5. Añade **al menos un comentario que explique un porqué** que el código no deja claro (por ejemplo, por qué se redondea la multa).
6. Crea `biblioteca.test.js` con un `describe` por función y **al menos dos tests en cada uno**, uno de ellos un **caso límite** (tema 9, apartado 9.8.5): sin días de retraso, justo la multa máxima, justo el límite de préstamos, una lista vacía… Ejecútalos con `npm test`.
7. Corrige los errores de ESLint (`npm run lint` sin errores) y formatea con Prettier (`npm run format`).
8. Completa el resto del `README.md`: la explicación de cada regla que fallaba, la salida de `npm run lint` **después** de tus cambios (sin errores), y la salida de `npm test` con el caso límite que prueba cada `describe`.

## Comprueba tu solución

- `npm start` muestra lo mismo antes y después de tus cambios:

  ```text
  0.6
  10
  "Rayuela" (Julio Cortázar)
  true
  false
  2
  ```

- `npm test` pasa con al menos ocho tests. Cambia a propósito la multa máxima de 10 a 12: algún test de la multa debe fallar. Si no falla ninguno, te falta el caso límite de la multa máxima. Deshaz el cambio.
- `npm run lint` no muestra ningún error y `npm run format:check` dice `All matched files use Prettier code style!`.
- Antes de tus cambios, ESLint daba **5 errores** de tres reglas: `no-var`, `prefer-const` y `eqeqeq`.
- En VS Code, al pasar el ratón por encima de cada llamada a una función, aparecen su descripción y sus parámetros.
- Añade `// @ts-check` en la primera línea: VS Code no debe subrayar nada en rojo. Prueba a llamar a la función de la multa con un texto (`'3'`) y comprueba que lo subraya.
- Ningún comentario dice lo mismo que la línea de código que tiene al lado.

## Integración continua (opcional)

> 📝 Este apartado es **opcional** y no cuenta para la corrección. Hazlo si en clase habéis visto GitHub Actions; si no, sáltatelo.

Sube el proyecto a un repositorio tuyo de GitHub (el `.gitignore` ya deja fuera `node_modules/`). Escribe un *workflow* de GitHub Actions que pase **todas las comprobaciones del proyecto** cada vez que subas cambios. Escríbelo tú, en `.github/workflows/ci.yml`, con estas orientaciones:

- Se ejecuta con cada `push` y cada *pull request* a la rama `main`.
- Tiene un único trabajo (*job*) que se ejecuta en `ubuntu-latest`.
- Sus pasos, en este orden, cada uno con un nombre (`name`) en español que diga qué hace:
  1. Descargar el código, con la acción `actions/checkout@v7`.
  2. Instalar Node.js 24, con la acción `actions/setup-node@v7` y `node-version: 24`.
  3. Instalar las dependencias con `npm install`. El proyecto no tiene `package-lock.json`, así que no uses `npm ci`.
  4. Revisar el código con ESLint: `npm run lint`.
  5. Comprobar el formato con Prettier: `npm run format:check`.
  6. Ejecutar los tests: `npm test`.
- Prettier también revisa el formato de `ci.yml`: ejecuta `npm run format` antes de subirlo.

Compruébalo:

1. Sube los cambios y abre la pestaña **Actions** del repositorio: la ejecución debe salir en verde, con los seis pasos.
2. Rompe algo a propósito (por ejemplo, vuelve a escribir `==` en lugar de `===`, o cambia el valor esperado de un test), sube el cambio y comprueba que la ejecución sale en rojo en el paso que corresponde. Después, deshaz el cambio y comprueba que vuelve a verde.

Deja constancia en la sección «Integración continua (opcional)» del `README.md`: el enlace a la ejecución en verde y dos capturas en `img/`, una de la ejecución en verde con sus pasos y otra de la ejecución en rojo con el paso que falla.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen que ha construido el `Dockerfile` tampoco se borra (se llama `vsc-` seguido del nombre de la carpeta), así que la próxima vez no hace falta construirla de nuevo. Si necesitas espacio, bórrala desde la pestaña **Images** de Docker Desktop o con `docker image rm <nombre>`.
