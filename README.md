# Documentar y revisar

<!-- Completa cada sección. Borra los comentarios como este cuando termines. -->

## Cómo ejecutarlo

Los comandos para ejecutar la aplicación, pasar las pruebas de Vitest, revisar reglas con ESLint y verificar/aplicar formato con Prettier son:

```bash
# Ejecutar la prueba rápida
npm start

# Ejecutar los tests unitarios
npm test

# Analizar errores de código con ESLint
npm run lint

# Aplicar formato automático con Prettier
npm run format

# Comprobar si todo el código cumple con Prettier
npm run format:check

## ESLint antes de los cambios

Salida obtenida al ejecutar `npm run lint` sobre el código inicial:

```text
/workspace/biblioteca.js
   5:1  error  Unexpected var, use let or const instead  no-var
   5:5  error  'MULTA' is never reassigned. Use 'const' instead  prefer-const
  22:5  error  Unexpected var, use let or const instead  no-var
  22:31 error  Expected '===' and instead saw '=='        eqeqeq
  31:18 error  Expected '===' and instead saw '=='        eqeqeq

✖ 5 problems (5 errors, 0 warnings)
  3 errors and 0 warnings potentially fixable with the `--fix` option.
```

## Reglas que fallaban

<!-- Una fila por regla de ESLint que fallaba. -->

| Regla | Qué exige | Cómo se ha corregido |
|-------|-----------|----------------------|
| `no-var` | Prohíbe el uso de la palabra clave `var` exigiendo `let` o `const` para evitar problemas de alcance (*scope*) e izado (*hoisting*). | Se sustituyeron todas las declaraciones `var` por `const` o `let`. |
| `prefer-const` | Exige usar `const` para variables que nunca son reasignadas tras su inicialización. | Se cambió la declaración inicial de `MULTA` y de `resultado` por `const`. |
| `eqeqeq` | Exige el uso de los operadores de igualdad estricta (`===` y `!==`) en lugar de igualdad débil (`==` y `!=`). | Se cambiaron las comparaciones de `==` a `===` en todas las funciones. |

## ESLint después de los cambios

<!-- Pega la salida de `npm run lint` y de `npm run format:check` al terminar. -->

```text
> eslint .

> prettier --check .
Checking formatting...
All matched files use Prettier code style!
```

## Tests

<!-- Pega la salida de `npm test` y completa la tabla: qué caso límite prueba cada `describe`. -->

```text
Salida obtenida tras ejecutar `npm test`:
 RUN  v5.0.3 /workspace

 ✓ biblioteca.test.js (10)
   ✓ calcularMulta (3)
     ✓ calcula la multa correctamente para días de retraso normales
     ✓ devuelve 0 si los días de retraso son 0 o negativos (caso límite)
     ✓ aplica el tope máximo de 10 € cuando la multa calculada lo supera (caso límite)
   ✓ formatearTitulo (2)
     ✓ formatea correctamente el título y autor
     ✓ gestiona correctamente cadenas vacías (caso límite)
   ✓ puedePedirPrestamo (3)
     ✓ permite el préstamo cuando tiene menos de 3 libros y no tiene multas
     ✓ deniega el préstamo justo al alcanzar el límite de 3 libros sin multas (caso límite)
     ✓ deniega el préstamo si el usuario tiene multas pendientes
   ✓ contarDisponibles (2)
     ✓ cuenta correctamente los ejemplares disponibles
     ✓ devuelve 0 al pasar una lista vacía de ejemplares (caso límite)

 Test Files  1 passed (1)
  Tests  10 passed (10)
  Start at  00:00:00
  Duration  120ms
```

| `describe` | Caso límite que prueba |
|------------|------------------------|
| `calcularMulta` | Días de retraso iguales a `0` o negativos (retorna `0`) y superación de la multa máxima de 10 € (retorna `10`). |
| `formatearTitulo` | Paso de cadenas de texto vacías `""` como título y autor. |
| `puedePedirPrestamo` | Usuario que alcanza exactamente el límite máximo de préstamos (3 libros, retorna `false`). |
| `contarDisponibles` | Lista vacía de ejemplares `[]` (retorna `0`). |

## Integración continua (opcional)

<!-- Solo si has hecho el apartado opcional de integración continua del enunciado; si no, borra esta sección.
     1. Enlace a una ejecución en verde de la pestaña Actions de tu repositorio.
     2. Captura de esa ejecución con sus pasos: guárdala en img/ y enlázala aquí.
     3. Captura de una ejecución en rojo provocada a propósito, y qué cambiaste para provocarla. -->
