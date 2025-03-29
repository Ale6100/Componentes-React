import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Recibe dos números `num1` y `num2` donde `num1` <= `num2`. Devuelve un número al azar entre ellos (no incluye al `num2`)
 * @param {number} num1 Primer número
 * @param {number} num2 Segundo número (debe ser mayor o igual que el primero)
 * @throws {error} Si alguno de los parámetros no es un número
 * @returns {number} Un número al azar entre `num1` y `num2` (sin incluir al `num2`)
 */
export const numeroAlAzar = (num1: number, num2: number): number => {
  if (typeof num1 !== 'number' || typeof num2 !== 'number' || isNaN(num1) || isNaN(num2)) throw new Error(`numeroAlAzar requiere números válidos. Se recibió ${num1} y ${num2}`);
  if (num1 > num2) throw new Error(`num1 debe ser <= num2. Se recibió ${num1} y ${num2}`);
  return num1 + Math.random() * (num2 - num1);
}

/**
 * Recibe dos números enteros y devuelve un número entero al azar entre ellos (incluyendo a ambos números)
 * @param {number} num1 Primer número entero
 * @param {number} num2 Segundo número entero
 * @throws {error} Si alguno de los parámetros no es un entero
 * @returns {number} Retorna un numero entero al azar entre `num1` y `num2`
 */
export const numeroEnteroAlAzar = (num1: number, num2: number): number => {
  if (!Number.isInteger(num1) || !Number.isInteger(num2)) throw new Error(`numeroEnteroAlAzar debe recibir dos números enteros. Se ha recibido ${JSON.stringify(num1)} (${typeof num1}) y ${JSON.stringify(num2)} (${typeof num2})`)
  const numeroBuscado = Math.round(numeroAlAzar(num1-0.5, num2+0.5))
  return Object.is(numeroBuscado, -0) ? 0 : numeroBuscado // Evitamos que el resultado pueda ser -0 en lugar de 0
}

/**
 * Recibe dos números `a` y `b` (con `a` menor o igual que `b`),
 * devuelve un string con caracteres aleatorios de longitud entre `a` y `b`
 * @param {number} a Límite inferior para la longitud del string (número natural).
 * @param {number} b Límite superior para la longitud del string (número natural).
 * @returns {string} Retorna un string aleatorio de longitud entre `a` y `b`
 * @throws {Error} Si `a` o `b` no son números naturales o si `a > b`
 */
export const stringAleatorio = (a: number, b: number): string => {
  if (!Number.isInteger(a) || !Number.isInteger(b) || a <= 0 || b <= 0) throw new Error(`stringAleatorio debe recibir dos números naturales. Se han recibido ${JSON.stringify(a)} (${typeof a}) y ${JSON.stringify(b)} (${typeof b})`);
  if (a > b) throw new Error(`stringAleatorio: El límite inferior 'a' no puede ser mayor que el límite superior 'b'`);
  const longitud = numeroEnteroAlAzar(a, b);
  const simbolos = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789¡!¿?@#$%&()+-=*,.;:_";
  let stringRandom = "";
  for (let i = 1; i <= longitud; i++) {
      stringRandom += simbolos[Math.floor(simbolos.length * Math.random())];
  }
  return stringRandom
}
