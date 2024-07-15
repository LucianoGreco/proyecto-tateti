import Cuadrado from "./Cuadrado"

export const GanadorModal = ( {ganador, resetearJuego} ) => {

    if(ganador === null) return null

    const textoGanador = ganador === false ? 'Empate': 'Gano:';

    return(  
        <section className="ganador">
            <div className="texto">
                <h2>{textoGanador}</h2>
                
                <header className="gana">
                    {ganador && <Cuadrado>{ganador}</Cuadrado>}
                </header>
                
                <footer>
                    <button onClick={resetearJuego}>Empezar de nuevo</button>
                </footer>
            </div>
        </section>
    )
}
