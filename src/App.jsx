import { useState }                                 from "react"
import confetti                                     from "canvas-confetti"
import {TURNOS}                                     from "./constante" // Se desectructura por que son dos funciones distintas en el mismo archivo
import { comprobarGanador, comprobarJuegoFinal }    from "./logic/tablero"
import Cuadrado                                     from "./components/Cuadrado"
import { GanadorModal }                             from "./components/GanadorModal"



function App() {
 // Estados
 const [tablero, setTablero] = useState(Array(9).fill(null)) // Tablero con 9 box nullos
 const [turno, setTurno]     = useState(TURNOS.x)            // Turnos (x u o)
 const [ganador, setGanador] = useState(null)                // Nul: no hay ganador (flase: empate / true: ganador)
 
 // funnciones
 
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
                        {/* {'Pija'} */}
                    </Cuadrado>
                )})}

        </section>
        
        <section className="turno">
            <Cuadrado esSeleccionado={turno === TURNOS.x}> {TURNOS.x} </Cuadrado>
            <Cuadrado esSeleccionado={turno === TURNOS.o}> {TURNOS.o} </Cuadrado>
        </section>
    
        <GanadorModal resetearJuego={resetearJuego} ganador={ganador}/>

    </main>
    )
}
export default App



// 47:42 / 2:06:15 Minuto (Finalizo con el canvas-confettis)