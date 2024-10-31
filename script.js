

let vidas=3 // cantidad de veces que no exista la letra seleccionada en la pantalla 
const cantMaxJugadores=5
let letrasYaIngresadas=[] // array donde guardo las letras que se van seleccionando
let jugadores=[] // lista de jugadores
let indiceJugadores=0 // indice para recorrer la lista de jugadores

/* ingreso los jugadores y los pongo en el array, hasta 5 jugadores */
let jugadorNombre=""
let i=1
jugadorNombre=prompt("Ingrese Nombre del Jugador " + i + ", o deje en blanco para continuar. \nSe permiten hasta "+cantMaxJugadores+" jugadores")
while (jugadorNombre.length>0 && i<=cantMaxJugadores){
  jugadores.push(jugadorNombre)
  i++
  jugadorNombre=prompt("Ingrese Nombre del Jugador " + i + ", o deje en blanco para continuar. \nSe permiten hasta "+cantMaxJugadores+" jugadores")
}
console.log(jugadores)

/* solicita la palabra por pantalla y arma los arrays de trabajo */
let palabra=prompt("Ingrese la palabra propuesta: ")
let arrayPalabraReal=palabra.split('') // arma un array a partir de la palabra ingresada
let arrayPalabraMostrar = []
/* armo el array de palabra a mostrar */
for(let i = 0; i < arrayPalabraReal.length; i++){arrayPalabraMostrar.push("_")}

/* ************* bloque principal del programa *******************
El siguiente while continua mientras las siguientes condiciones: 
- a) que aun haya intentos disponibles
- b) que aun haya letras por averiguar 
******************************************************************/
alert("PREPARAOS... EL JUEGO ESTÁ POR COMENZAR...")

while (vidas>0 && arrayPalabraMostrar.indexOf("_") != -1){
  
  // solicito al usuario que ingrese su opcion: puede ser una letra o una palabra
  let letra = prompt(" Ahora Juega: "+jugadores[indiceJugadores]+"\n Intentos: "+vidas+"\n Letras Ya Ingresadas: "+letrasYaIngresadas+"\n Palabra: "+arrayPalabraMostrar+"\n Ingrese una letra o ARRIESGUE: ")
  // cargo la letra/palabra como ya ingresada para llevar control
  letrasYaIngresadas.push(letra)

  if (letra.length==1){ // si ingresó una letra
    let ubicacionLetra = arrayPalabraReal.indexOf(letra);
      
    if (ubicacionLetra == -1) {
      vidas-- // si la letra no está, sumo un error 
    } else {
      /* si encontro al menos una, reemplazo las ocurrencias de la letra en el arrayPalabraMostrar */
      while (ubicacionLetra != -1) {
        /* actualizo la muestra */
        arrayPalabraMostrar.splice(ubicacionLetra, 1, letra);
        /* luego quito la letra del arrayPalabraReal para que no aparezcan nuevamente */
        arrayPalabraReal.splice(ubicacionLetra, 1, "_");
        /* vuelvo a buscar por si hay nuevas ocurrencias */
        ubicacionLetra = arrayPalabraReal.indexOf(letra, ubicacionLetra + 1);
      }
    }
  } else { // si ingreso mas de una letra, considero que se arriesgó, por lo tanto comparo con palabra
      if (palabra==letra) {
        arrayPalabraMostrar=palabra.split('') // cargo el array a mostrar como si se hubiese adivinado todo
        break // finalizo while asi paso a anunciar ganador
      } else {
        // aqui tambien se podria considerar que el juego se detenga, declarando perdedor a quien no adivino
        vidas--
      }
  }

  // gestiono el indice de jugadores para que juegue el siguiente, o comience nuevamente
  indiceJugadores++ 
  if (indiceJugadores==jugadores.length){indiceJugadores=0}
  
}

/* aqui controlo la condicion de salida del while para informar al usuario */
if (vidas==0){
  alert("No tienen mas intentos BABOSOS!. La palabra buscada era: "+palabra)
} else if(arrayPalabraMostrar.indexOf("_") == -1) {
  alert("EXCELENTE!! "+jugadores[indiceJugadores]+" Encontraste la palabra buscada!")
}

// ************** FIN DEL PROGRAMA ***************