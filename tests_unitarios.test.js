import { describe, it, expect } from 'vitest';
import {
  calcularMulta,
  formatearTitulo,
  puedePedirPrestamo,
  contarDisponibles,
} from './biblioteca.js';

describe('calcularMulta', () => {
  it('calcula la multa correctamente para días de retraso normales', () => {
    expect(calcularMulta(3)).toBe(0.6);
  });

  it('devuelve 0 si los días de retraso son 0 o negativos (caso límite)', () => {
    expect(calcularMulta(0)).toBe(0);
    expect(calcularMulta(-5)).toBe(0);
  });

  it('aplica el tope máximo de 10 € cuando la multa calculada lo supera (caso límite)', () => {
    expect(calcularMulta(80)).toBe(10);
  });
});

describe('formatearTitulo', () => {
  it('formatea correctamente el título y autor', () => {
    expect(formatearTitulo('Rayuela', 'Julio Cortázar')).toBe('"Rayuela" (Julio Cortázar)');
  });

  it('gestiona correctamente cadenas vacías (caso límite)', () => {
    expect(formatearTitulo('', '')).toBe('"" ()');
  });
});

describe('puedePedirPrestamo', () => {
  it('permite el préstamo cuando tiene menos de 3 libros y no tiene multas', () => {
    expect(puedePedirPrestamo(2, false)).toBe(true);
  });

  it('deniega el préstamo justo al alcanzar el límite de 3 libros sin multas (caso límite)', () => {
    expect(puedePedirPrestamo(3, false)).toBe(false);
  });

  it('deniega el préstamo si el usuario tiene multas pendientes', () => {
    expect(puedePedirPrestamo(1, true)).toBe(false);
  });
});

describe('contarDisponibles', () => {
  it('cuenta correctamente los ejemplares disponibles', () => {
    const lista = ['disponible', 'prestado', 'disponible', 'reparación'];
    expect(contarDisponibles(lista)).toBe(2);
  });

  it('devuelve 0 al pasar una lista vacía de ejemplares (caso límite)', () => {
    expect(contarDisponibles([])).toBe(0);
  });
});
