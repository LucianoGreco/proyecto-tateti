export const guardarJuegoStorage = ( {tablero, turno} ) => {
    // Guardar la partida
    window.localStorage.setItem('tablero', JSON.stringify(tablero))
    // Guardar el turno
    window.localStorage.setItem('turno', turno)
}

export const resetearJuegoStorage = () => {
    window.localStorage.removeItem('tablero')
    window.localStorage.removeItem('turno')
}