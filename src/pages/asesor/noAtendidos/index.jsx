import React, { useState } from 'react'
import Image from 'next/image'
import NavBarAsesor from '@/components/navBarAsesor'
import Bg from '@/Media/BgBlue.png'
import { useQuery } from 'react-query'
import getTurnosNoAtendidos from '@/services/getTurnosNoAtendidos'
import Card from '@/components/card'
import llamarNoAtendido from '@/services/postLlamarNoAtendido'

function NoAtendidosPage() {
  let session = null
  if (typeof sessionStorage !== 'undefined') {
    session = sessionStorage.getItem('Session')
  }

  const [modalVisible, setModalVisible] = useState(false)

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const {
    data: turnosData,
    isLoading,
    isError,
    refetch: refetchTurnos,
  } = useQuery(['turnosNoAtendidos', session], () =>
    getTurnosNoAtendidos(session),
  )

  const handleLlamarTurno = async (turnoId) => {
    try {
      await llamarNoAtendido(session, turnoId)
      openModal()
      refetchTurnos()
    } catch (error) {
      console.error('Error al llamar turno:', error.message)
    }
  }

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredTurnos =
    turnosData && Array.isArray(turnosData)
      ? turnosData.filter((turno) =>
          turno.numeroTurno.toString().padStart(3, '0').includes(searchTerm),
        )
      : []

  return (
    <NavBarAsesor>
      <>
        <div className="m-auto relative z-20 w-3/4">
          <Card color="bgWhiteColor">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold yellowColor">
                Turnos no atendidos
              </h1>
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Buscar turno por número"
                  className="w-60 border border-gray-400 rounded-md px-4 py-2 mt-4"
                  style={{ position: 'sticky', top: '0', zIndex: '30' }}
                />
                <div
                  className="mt-5 max-h-80 overflow-y-auto"
                  style={{ maxHeight: '400px' }}
                >
                  <table className="w-full">
                    <thead>
                      <tr className="text-3xl">
                        <th>Numero de Turno</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTurnos.length > 0 ? (
                        filteredTurnos.map((turno) => (
                          <tr
                            key={turno.id}
                            className="text-2xl mt-2 flex flex-row gap-20 justify-between"
                          >
                            <td className="flex justify-center">
                              {turno.categoria === 0
                                ? 'PR'
                                : turno.categoria === 1
                                ? 'BG'
                                : 'CN'}
                              {turno.numeroTurno.toString().padStart(3, '0')}
                            </td>
                            <td className="flex justify-center">
                              <button
                                className="w-auto text-xl px-5 h-10 rounded-full bg-green"
                                onClick={() => handleLlamarTurno(turno.id)}
                              >
                                Volver a llamar
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2">
                            No hay turnos no atendidos que coincidan con la
                            búsqueda
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="absolute z-10 bottom-0 flex justify-center">
          <Image src={Bg} width={2000}></Image>
        </div>
        {modalVisible == true ? (
          <div className="flex w-full z-30 h-screen bg-black bg-opacity-70 absolute top-0 left-0">
            <div className="flex w-full justify-center items-center">
              <div className="w-full flex flex-col items-center mt-10 justify-around">
                <div className="flex flex-col w-6/12">
                  <Card>
                    <div className="flex flex-col w-6/12 justify-center items-center">
                      <h1 className="text-4xl font-bold text-center mt-10">
                        Turno agregado a la cola exitosamente
                      </h1>
                      <button
                        className="z-40 bg-blue hover:bg-blue text-white mt-5 font-bold py-2 px-4 rounded"
                        onClick={closeModal}
                      >
                        Aceptar
                      </button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    </NavBarAsesor>
  )
}

export default NoAtendidosPage
