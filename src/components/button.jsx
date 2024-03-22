import '@/app/globals.css'
import PropTypes from 'prop-types'
/**
 * @component Button
 * @param {Object} props.children Contenido del componente.
 * @param {string} props.color Color del componente.
 * @param {function} props.onClick Función que se ejecuta al hacer click en el botón.
 * @returns {JSX.Element} Componente de barra de navegación.
 */

function Button({ children, color, onClick }) {
  return (
    <button
      type="submit"
      className={
        'w-40 flex hover:scale-105 justify-center items-center px-4 py-2 rounded-3xl mt-10 ' +
        color
      }
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  color: 'bgYellowColor',
}

export default Button
