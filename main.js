// E09 · Documentar y revisar
// Prueba rápida de las funciones de la biblioteca
import {
  calcularMulta,
  formatearTitulo,
  puedePedirPrestamo,
  contarDisponibles,
} from './biblioteca.js';


console.log(calcularMulta(3));
console.log(calcularMulta(80));
console.log(formatearTitulo('Rayuela', 'Julio Cortázar'));
console.log(puedePedirPrestamo(2, false));
console.log(puedePedirPrestamo(3, false));
console.log(contarDisponibles(['disponible', 'prestado', 'disponible', 'reparación']));
