// Square
const Cuadrado = ( {index, modificarTablero, children, esSeleccionado} ) => {
    const className = `cuadrado ${esSeleccionado ? 'seleccionado' : ''}`
    
    const handleClick = () => {
        // console.log(index); // 012345678
        modificarTablero(index)
    }
    // REENDERIZADO  {children} = (x u o)
    return(
        <div onClick={handleClick} className={className}>
            {children}
        </div>
  )
}
export default Cuadrado;