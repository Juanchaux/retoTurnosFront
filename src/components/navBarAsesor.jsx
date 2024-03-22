import React, { useEffect } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import getAsesor from '@/services/getAsesor'
import { useAsesorContext } from '@/context/asesorContext'
/**
 * @component NavBar
 * @param {string} props.color Color del componente.
 * @param {React.ReactNode} props.children Contenido del componente.
 * @returns {JSX.Element} Componente de barra de navegación.
 */

function NavBarAsesor({ color, children }) {
  const { nombreAsesor, setNombreAsesor } = useAsesorContext()

  let session = null
  if (typeof sessionStorage !== 'undefined') {
    session = sessionStorage.getItem('Session')
  }
  const {
    data: asesorData,
    isLoading,
    isError,
  } = useQuery(['asesor', session], () => getAsesor(session))

  useEffect(() => {
    if (asesorData) {
      setNombreAsesor(asesorData.nombre)
    }
  }, [asesorData])

  useEffect(() => {
    if (nombreAsesor) {
      setNombreAsesor(nombreAsesor)
    }
  }, [nombreAsesor])

  useEffect(() => {
    if (!session) {
      window.location.href = '/login'
    }
  }, [session])

  const handleLogout = () => {
    sessionStorage.removeItem('Session')
    window.location.href = '/login'
  }

  if (isLoading) {
    return <div>Loading...</div> // Puedes personalizar el mensaje de carga
  }

  if (isError || !asesorData) {
    return <div>Error al cargar el asesor</div> // Puedes personalizar el mensaje de error
  }

  return (
    <>
      <div className="flex w-full">
        <div className="flex w-full justify-between px-20 mt-1 items-center shadow-lg pb-4">
          <div className="flex mt-3 justify-center px-4 items-center border-2 border-green">
            <h3 className="text-xl font-semibold">{nombreAsesor}</h3>
          </div>
          <nav className="w-auto flex mt-3 justify-between">
            <ul className="list-none flex flex-row gap-20">
              <li>
                <Link
                  href="/asesor"
                  className="cursor-pointer pb-2 hover:border-solid hover:border-b-2 hover:border-blue"
                >
                  Gestion de Turnos
                </Link>
              </li>
              <li>
                <Link
                  href="/asesor/consultar"
                  className="cursor-pointer pb-2 hover:border-solid hover:border-b-2 hover:border-blue"
                >
                  Consultar Historial
                </Link>
              </li>
              <li>
                <Link
                  href="/asesor/noAtendidos"
                  className="cursor-pointer pb-2 hover:border-solid hover:border-b-2 hover:border-blue"
                >
                  No Atendidos
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex">
            <button
              onClick={handleLogout}
              className={
                'flex justify-center items-center px-8 py-2 rounded-3xl mt-3 hover:scale-105 ' +
                color
              }
            >
              Salir
            </button>
          </div>
        </div>
      </div>
      {children}
    </>
  )
}

NavBarAsesor.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
}

NavBarAsesor.defaultProps = {
  color: 'bgYellowColor',
}

export default NavBarAsesor
