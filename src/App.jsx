import { useState } from "react"
import Cuadrado from "./components/Cuadrado"
import confetti from "canvas-confetti"
import { TURNOS, COMBINACIONES_GANADORAS } from "./constante"


function App() {
 // Estados
 const [tablero, setTablero] = useState(Array(9).fill(null)) // Tablero con 9 box nullos
 const [turno, setTurno]     = useState(TURNOS.x)            // Turnos (x u o)
 const [ganador, setGanador] = useState(null)                // Nul: no hay ganador (flase: empate / true: ganador)
 
 // funnciones
 //CheckWinner
 const comprobarGanador = (comprobarnuevoTablero) =>{

 /* const COMBINACIONES_GANADORAS = [
             a|b|c    
 [0,1,2], [x|o|o] -----> Combinacion 0°
 [3,4,5], [x|x|o] -----> Combinacion 1°
 [6,7,8], [x|o|x] -----> Combinacion 2°

 [0,3,6], [x|x|x] -----> Combinacion 3° Ganadora 🎉✨
 [1,4,7], [o|x|o] -----> Combinacion 4°
 [2,5,8], [o|o|x] -----> Combinacion 5°
 
 [0,4,8], [x|x|x] -----> Combinacion 6°
 [2,4,6]  [o|x|o] -----> Combinacion 7°
 ] */

 // checkWinner
 // [X|O|X]
 // [X|O|O] 
 // [X|O|X]

     console.log(comprobarnuevoTablero);

     // busca similitud con las combinaciones ganadoras
     for(const combinacion of COMBINACIONES_GANADORAS){
         //     x o x
         const [a,b,c] = combinacion

         if(
             comprobarnuevoTablero[a] &&                          // [a] existe
             comprobarnuevoTablero[a] === comprobarnuevoTablero[b] &&  // [a] y [b] son iguales
             comprobarnuevoTablero[a] === comprobarnuevoTablero[c]     // [a] y [c] son iguales
         ){
             return comprobarnuevoTablero[a]                      // [a] es e ganador (x u o)
         }                                        // Null no hay ganador
     }
     return null  
 }
 //boardUpdate
 const modificarTablero = (index) => { 
     /* TABLERO / index [0,1,2,3,4,5,6,7,8]
     [0][1][2]
     [3][4][5]
     [6][7][8] */

     // Evita seguir jugando
     if(tablero[index] || ganador) return // Si el campo ya esta ocupado con (x,o) y hay un ganador, detiene la ejecucion
     
     // const [tablero, setTablero] = useState(Array(9).fill(null)) 
     // const [turno, setTurno]     = useState(iniciado...)  
     // const [ganador, setGanador] = useState(null) */  
     
     // Tablero Actual
     const nuevoTablero = [...tablero] 
     // console.log(nuevoTablero);

     //👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
     // Modifica el tablero 
     nuevoTablero[index] = turno // SOBREESCRIBE index => turno
     // console.log(nuevoTablero);

     // Guarda el estado
     setTablero(nuevoTablero)

     // Cambiar el turno
     const nuevoTurno = turno === TURNOS.x ? TURNOS.o : TURNOS.x // (if(turno = x){nuevoTurno = o}else{nuevoTurno = x})
     setTurno(nuevoTurno)

     // Revisar si hay ganador
     const nuevoGanador = comprobarGanador(nuevoTablero)
     if(nuevoGanador){
         confetti()
         setGanador(nuevoGanador) // Asincrono (demora un poco)
         // alert(`El ganador es ${nuevoGanador}`) // El estado aun no actualiza el nuevo ganador (Asincrono)
     }else if(comprobarJuegoFinal(nuevoTablero)){
         setGanador(false) // empate
     }
 }
 //resetGame
 const resetearJuego = () => {
     setTablero(Array(9).fill(null))
     setTurno(TURNOS.x)
     setGanador(null)
 }
 //checkEndGame
 const comprobarJuegoFinal = (nuevoTablero) => {
     return nuevoTablero.every((cuadrado)=> cuadrado !== null)
 }
 
 // Renderizado
 return (
  <main className="tablero">
      <h1>TA TE TI</h1>
      <button onClick={resetearJuego}>Resetear el Juego</button>
      <section className="juego">{ 
          tablero.map((cuadrado,index) => {
              return( // {tablero[index]}
                  <Cuadrado key={index} index={index} modificarTablero={modificarTablero}>
                      {cuadrado} 
                  </Cuadrado>
              )})}
      </section>
      
      <section className="turno">
          <Cuadrado esSeleccionado={turno === TURNOS.x}> {TURNOS.x} </Cuadrado>
          <Cuadrado esSeleccionado={turno === TURNOS.o}> {TURNOS.o} </Cuadrado>
      </section>

      {ganador !== null && (
          <section className="ganador">
              <div className="texto">

                  <h2>{ganador === false ? 'Empate': 'Gano:'}</h2>

                  <header className="gana">
                      {ganador && <Cuadrado>{ganador}</Cuadrado>}
                  </header>

                  <footer>
                      <button onClick={resetearJuego}>Empezar de nuevo</button>
                  </footer>
              </div>
          </section>
      )}

      
  </main>
 )
}
export default App



// 47:42 / 2:06:15 Minuto (Finalizo con el canvas-confettis)