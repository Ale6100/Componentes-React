/**
 * Hace que tu código asincrónico espere un tiempo (en milisegundos) que le pases como parámetro antes de continuar la ejecución
 * @param time Tiempo de espera en milisegundos
 * @returns Una promesa que se resuelve cuando se cumple el tiempo de espera
 * @throws {Error} Si el parámetro `time` no es un número positivo.
*/
export const waitFor = (time: number): Promise<void> => {
  if (typeof time !== "number" || time < 0) throw new Error(`waitFor debe recibir un número positivo (en milisegundos). Se ha recibido ${JSON.stringify(time)} (${typeof time})`)
  return new Promise(resolve => setTimeout(resolve, time))
}
