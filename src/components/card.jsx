import React from 'react'
import PropTypes from 'prop-types'
import '../app/globals.css'

/**
 * @component Card
 * @param {Object} props.children Contenido del componente.
 * @param {string} props.color Color del componente.
 * @returns {JSX.Element} Componente de barra de navegación.
 */

function Card({ children, color }) {
  return (
    <div
      className={`w-full flex justify-center items-center shadow-lg ${color} p-10 rounded-3xl`}
    >
      {children}
    </div>
  )
}

Card.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Card.defaultProps = {
  color: 'bg-white',
}

export default Card
