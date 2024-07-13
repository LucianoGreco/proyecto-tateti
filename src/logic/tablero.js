
import { COMBINACIONES_GANADORAS } from "../constante";

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
    export default comprobarGanador;