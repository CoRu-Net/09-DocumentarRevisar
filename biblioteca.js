// @ts-check

/** @type {number} Tarifa de multa diaria por retraso en euros. */
const MULTA_DIARIA = 0.2;

/** @type {number} Cuantía máxima posible para una multa en euros. */
const MULTA_MAXIMA = 10;

/**
 * Calcula la multa económica generada por días de retraso en la devolución de un libro.
 *
 * @param {number} diasRetraso - Número de días de retraso en la devolución.
 * @returns {number} Importe de la multa redondeado a dos decimales en euros.
 * @example
 * calcularMulta(3); // Devuelve 0.6
 */
export function calcularMulta(diasRetraso) {
  if (diasRetraso <= 0) return 0;
  let multa = diasRetraso * MULTA_DIARIA;
  if (multa > MULTA_MAXIMA) multa = MULTA_MAXIMA;
  // Se multiplica y divide por 100 para redondear a dos decimales de forma precisa,
  // evitando imprecisiones de representación en punto flotante propias del estándar IEEE 754 en JavaScript.
  return Math.round(multa * 100) / 100;
}

/**
 * Formatea el título y autor de un libro para su representación en catálogo.
 *
 * @param {string} titulo - Título del libro.
 * @param {string} autor - Nombre del autor del libro.
 * @returns {string} Cadena formateada con el título entre comillas y el autor entre paréntesis.
 * @example
 * formatearTitulo('Rayuela', 'Julio Cortázar'); // Devuelve '"Rayuela" (Julio Cortázar)'
 */
export function formatearTitulo(titulo, autor) {
  return '"' + titulo + '" (' + autor + ')';
}

/**
 * Comprueba si un usuario puede solicitar un nuevo préstamo según sus préstamos actuales y sanciones.
 *
 * @param {number} prestamosActuales - Cantidad de libros en préstamo del usuario.
 * @param {boolean} tieneMultasPendientes - Indica si el usuario tiene sanciones pendientes.
 * @returns {boolean} `true` si cumple los requisitos para pedir prestado, `false` en caso contrario.
 * @example
 * puedePedirPrestamo(2, false); // Devuelve true
 */
export function puedePedirPrestamo(prestamosActuales, tieneMultasPendientes) {
  const LIMITE_PRESTAMOS = 3;
  return prestamosActuales < LIMITE_PRESTAMOS && tieneMultasPendientes === false;
}

/**
 * Cuenta la cantidad de ejemplares en estado disponible en una lista.
 *
 * @param {string[]} listaEjemplares - Lista con los estados de los ejemplares de la biblioteca.
 * @returns {number} Número de ejemplares disponibles.
 * @example
 * contarDisponibles(['disponible', 'prestado', 'disponible']); // Devuelve 2
 */
export function contarDisponibles(listaEjemplares) {
  let disponibles = 0;
  for (let i = 0; i < listaEjemplares.length; i++) {
    if (listaEjemplares[i] === 'disponible') {
      disponibles++;
    }
  }
  return disponibles;
}
