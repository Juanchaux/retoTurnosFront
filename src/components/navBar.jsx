import React from 'react'
import Image from 'next/image'
import Logo from '../Media/TurnoTechBlack.png'
import '../app/globals.css'
import Link from 'next/link'
import PropTypes from 'prop-types'

/**
 * @component NavBar
 * @param {string} props.color Color del componente.
 * @returns {JSX.Element} Componente de barra de navegación.
 */

function NavBar({ color }) {
  return (
    <div className="flex w-full">
      <div className="flex w-full justify-between px-20 mt-1 items-center shadow-lg pb-4">
        <Link href="/">
          <Image src={Logo} alt="Logo" width={150} priority={true} />
        </Link>
        <nav className="w-auto flex mt-3 justify-between">
          <ul className="list-none flex flex-row gap-20">
            <li>
              <Link
                href="/"
                className="cursor-pointer pb-2 hover:border-solid hover:border-b-2 hover:borderYellowColor"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/solicitarTurno"
                className="cursor-pointer pb-2 hover:border-solid hover:border-b-2 hover:borderYellowColor"
              >
                Solicitar Turno
              </Link>
            </li>
            <li>
              <Link
                href="/consultarTurno"
                className="cursor-pointer pb-2 hover:border-solid hover:border-b-2 hover:borderYellowColor"
              >
                Consultar Turno
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex">
          <Link href="/login">
            <button
              className={
                'flex justify-center items-center px-8 py-2 rounded-3xl mt-3 hover:scale-105 ' +
                color
              }
            >
              Ingresar
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

NavBar.propTypes = {
  color: PropTypes.string,
}

NavBar.defaultProps = {
  color: 'bgYellowColor',
}

export default NavBar
