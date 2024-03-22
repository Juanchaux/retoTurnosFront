import React from "react";
import Image from "next/image";
import Bg from "@/Media/BgBlue.png";
import Card from "@/components/card";
import NavBarAsesor from "@/components/navBarAsesor";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import getTurnosDia from "@/services/getTurnosDia";
import { useAsesorContext } from "@/context/asesorContext";
import { useQueryClient } from "react-query";
import getSiguienteTurno from "@/services/getSiguienteTurno";
import terminarTurno from "@/services/postTerminarTurno";
import postNoAtendido from "@/services/postNoAtendido";
import getPrimeros5 from "@/services/getPrimeros5Turnos";

function AsesorPage() {
  const queryClient = useQueryClient();
  const [numeroPrioritarios, setNumeroPrioritarios] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [listTurnos, setListTurnos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { turnos, setTurnos } = useAsesorContext();
  const [turnoActual, setTurnoActual] = useState("");
  const [prioritarios, setPrioritarios] = useState(0);
  const [buenagente, setBuenaGente] = useState(0);
  const [normal, setNormal] = useState(0);
  const [tiempoPromedio, setTiempoPromedio] = useState("");
  const [tiempoPromedioPrioritarios, setTiempoPromedioPrioritarios] =
    useState("");
  const [tiempoPromedioBuenaGente, setTiempoPromedioBuenaGente] = useState("");
  const [tiempoPromedioClienteNormal, setTiempoPromedioClienteNormal] =
    useState("");

  let session = null;
  if (typeof sessionStorage !== "undefined") {
    session = sessionStorage.getItem("Session");
  }

  const {
    data: turnosData,
    isLoading,
    isError,
  } = useQuery(["asesor", session], () => getTurnosDia(session));

  const { data: cincoTurnosData } = useQuery(["primeros5", session], () =>
    getPrimeros5(session)
  );

  async function turnosDia() {
    const response = await getTurnosDia(session);
    return response;
  }

  useEffect(() => {
    if (turnosData && Array.isArray(turnosData)) {
      setTurnos(turnosData);

      const prioritariosTurnos = turnosData.filter(
        (turno) => turno.turno.categoria === 0
      );

      setNumeroPrioritarios(prioritariosTurnos.length);

      const buenaGenteTurnos = turnosData.filter(
        (turno) => turno.turno.categoria === 1
      );
      const clienteNormalTurnos = turnosData.filter(
        (turno) => turno.turno.categoria === 2
      );

      setPrioritarios(prioritariosTurnos.length);
      setBuenaGente(buenaGenteTurnos.length);
      setNormal(clienteNormalTurnos.length);

      const duracionTotalSegundos = turnosData.reduce((total, turno) => {
        const horaLlamada = new Date(turno.turno.horaLlamada);
        const horaTermino = new Date(turno.turno.horaTermino);

        const diferenciaTiempo = horaTermino - horaLlamada;

        const duracionSegundos = diferenciaTiempo / 1000;
        return total + duracionSegundos;
      }, 0);

      const tiempoPromedioSegundos = duracionTotalSegundos / turnosData.length;

      const minutos = Math.floor(tiempoPromedioSegundos / 60);
      const segundos = Math.round(tiempoPromedioSegundos % 60);

      const duracionTotalPrioritarios = prioritariosTurnos.reduce(
        (total, turno) => {
          const horaLlamada = new Date(turno.turno.horaLlamada);
          const horaTermino = new Date(turno.turno.horaTermino);
          const diferenciaTiempo = horaTermino - horaLlamada;
          return total + diferenciaTiempo / 1000;
        },
        0
      );

      const duracionTotalBuenaGente = buenaGenteTurnos.reduce(
        (total, turno) => {
          const horaLlamada = new Date(turno.turno.horaLlamada);
          const horaTermino = new Date(turno.turno.horaTermino);
          const diferenciaTiempo = horaTermino - horaLlamada;
          return total + diferenciaTiempo / 1000;
        },
        0
      );

      const duracionTotalClienteNormal = clienteNormalTurnos.reduce(
        (total, turno) => {
          const horaLlamada = new Date(turno.turno.horaLlamada);
          const horaTermino = new Date(turno.turno.horaTermino);
          const diferenciaTiempo = horaTermino - horaLlamada;
          return total + diferenciaTiempo / 1000;
        },
        0
      );

      const tiempoPromedioPrioritarios =
        duracionTotalPrioritarios / prioritariosTurnos.length;
      const tiempoPromedioBuenaGente =
        duracionTotalBuenaGente / buenaGenteTurnos.length;
      const tiempoPromedioClienteNormal =
        duracionTotalClienteNormal / clienteNormalTurnos.length;

      const minutosPrioritarios = Math.floor(tiempoPromedioPrioritarios / 60);
      const segundosPrioritarios = Math.round(tiempoPromedioPrioritarios % 60);

      const minutosBuenaGente = Math.floor(tiempoPromedioBuenaGente / 60);
      const segundosBuenaGente = Math.round(tiempoPromedioBuenaGente % 60);

      const minutosClienteNormal = Math.floor(tiempoPromedioClienteNormal / 60);
      const segundosClienteNormal = Math.round(
        tiempoPromedioClienteNormal % 60
      );

      setTiempoPromedioPrioritarios(
        `${minutosPrioritarios
          .toString()
          .padStart(2, "0")}:${segundosPrioritarios
          .toString()
          .padStart(2, "0")}`
      );
      setTiempoPromedioBuenaGente(
        `${minutosBuenaGente.toString().padStart(2, "0")}:${segundosBuenaGente
          .toString()
          .padStart(2, "0")}`
      );
      setTiempoPromedioClienteNormal(
        `${minutosClienteNormal
          .toString()
          .padStart(2, "0")}:${segundosClienteNormal
          .toString()
          .padStart(2, "0")}`
      );

      setTiempoPromedio(
        `${minutos.toString().padStart(2, "0")}:${segundos
          .toString()
          .padStart(2, "0")}`
      );
    }

    if (turnos && Array.isArray(turnos)) {
      const prioritariosTurnos = turnos.filter(
        (turno) => turno.turno.categoria === 0
      );

      setNumeroPrioritarios(prioritariosTurnos.length);

      const buenaGenteTurnos = turnos.filter(
        (turno) => turno.turno.categoria === 1
      );
      const clienteNormalTurnos = turnos.filter(
        (turno) => turno.turno.categoria === 2
      );

      setPrioritarios(prioritariosTurnos.length);
      setBuenaGente(buenaGenteTurnos.length);
      setNormal(clienteNormalTurnos.length);

      const duracionTotalSegundos = turnos.reduce((total, turno) => {
        const horaLlamada = new Date(turno.turno.horaLlamada);
        const horaTermino = new Date(turno.turno.horaTermino);

        const diferenciaTiempo = horaTermino - horaLlamada;

        const duracionSegundos = diferenciaTiempo / 1000;
        return total + duracionSegundos;
      }, 0);

      const tiempoPromedioSegundos = duracionTotalSegundos / turnos.length;

      const minutos = Math.floor(tiempoPromedioSegundos / 60);
      const segundos = Math.round(tiempoPromedioSegundos % 60);

      const duracionTotalPrioritarios = prioritariosTurnos.reduce(
        (total, turno) => {
          const horaLlamada = new Date(turno.turno.horaLlamada);
          const horaTermino = new Date(turno.turno.horaTermino);
          const diferenciaTiempo = horaTermino - horaLlamada;
          return total + diferenciaTiempo / 1000;
        },
        0
      );

      const duracionTotalBuenaGente = buenaGenteTurnos.reduce(
        (total, turno) => {
          const horaLlamada = new Date(turno.turno.horaLlamada);
          const horaTermino = new Date(turno.turno.horaTermino);
          const diferenciaTiempo = horaTermino - horaLlamada;
          return total + diferenciaTiempo / 1000;
        },
        0
      );

      const duracionTotalClienteNormal = clienteNormalTurnos.reduce(
        (total, turno) => {
          const horaLlamada = new Date(turno.turno.horaLlamada);
          const horaTermino = new Date(turno.turno.horaTermino);
          const diferenciaTiempo = horaTermino - horaLlamada;
          return total + diferenciaTiempo / 1000;
        },
        0
      );

      const tiempoPromedioPrioritarios =
        duracionTotalPrioritarios / prioritariosTurnos.length;
      const tiempoPromedioBuenaGente =
        duracionTotalBuenaGente / buenaGenteTurnos.length;
      const tiempoPromedioClienteNormal =
        duracionTotalClienteNormal / clienteNormalTurnos.length;

      const minutosPrioritarios = Math.floor(tiempoPromedioPrioritarios / 60);
      const segundosPrioritarios = Math.round(tiempoPromedioPrioritarios % 60);

      const minutosBuenaGente = Math.floor(tiempoPromedioBuenaGente / 60);
      const segundosBuenaGente = Math.round(tiempoPromedioBuenaGente % 60);

      const minutosClienteNormal = Math.floor(tiempoPromedioClienteNormal / 60);
      const segundosClienteNormal = Math.round(
        tiempoPromedioClienteNormal % 60
      );

      setTiempoPromedioPrioritarios(
        `${minutosPrioritarios
          .toString()
          .padStart(2, "0")}:${segundosPrioritarios
          .toString()
          .padStart(2, "0")}`
      );
      setTiempoPromedioBuenaGente(
        `${minutosBuenaGente.toString().padStart(2, "0")}:${segundosBuenaGente
          .toString()
          .padStart(2, "0")}`
      );
      setTiempoPromedioClienteNormal(
        `${minutosClienteNormal
          .toString()
          .padStart(2, "0")}:${segundosClienteNormal
          .toString()
          .padStart(2, "0")}`
      );

      setTiempoPromedio(
        `${minutos.toString().padStart(2, "0")}:${segundos
          .toString()
          .padStart(2, "0")}`
      );
    }
  }, [turnos, turnosData]);

  useEffect(() => {
    if (cincoTurnosData && Array.isArray(cincoTurnosData)) {
      setListTurnos(cincoTurnosData);
    }
  }, [cincoTurnosData]);

  const handleCloseModal = () => {
    setOpenModal(!openModal);
    queryClient.invalidateQueries("asesor");
    queryClient.invalidateQueries(["primeros5"]);
  };

  useEffect(() => {
    turnosDia();
  }, []);

  const handleSiguienteTurno = async () => {
    try {
      const response = await getSiguienteTurno(session);
      let turno = `${
        response.turno.categoria == 0
          ? "PR"
          : response.turno.categoria == 1
          ? "BG"
          : "CN"
      }${response.turno.numeroTurno.toString().padStart(3, "0")}`;
      let id = response.turno.id;
      setTurnoActual({ id, turno });
      setListTurnos((prevListTurnos) => prevListTurnos.slice(1));
      queryClient.invalidateQueries("asesor");
      queryClient.invalidateQueries(["primeros5", session]);
    } catch (error) {
      setErrorMessage("No hay mas turnos por atender.");
      setOpenModal(true);
    }
  };

  const handleTerminarTurno = async () => {
    try {
      const response = await terminarTurno(session, turnoActual.id);
      if (
        response.error &&
        response.error.includes("ya está marcado como terminado")
      ) {
        setOpenModal(true);
      } else {
        setOpenModal(true);
        queryClient.invalidateQueries("asesor");
        queryClient.invalidateQueries(["primeros5", session]);
      }
    } catch (error) {
      setErrorMessage("ERROR: Este turno ya fue terminado");
      setOpenModal(true);
    }
  };

  const handleNoAtendido = async () => {
    try {
      const response = await postNoAtendido(session, turnoActual.id);
      handleSiguienteTurno();
      setOpenModal(true);
      queryClient.invalidateQueries("asesor");
      queryClient.invalidateQueries(["primeros5", session]);
    } catch (error) {
      setErrorMessage("ERROR: Este turno ya cambio de estado");
      setOpenModal(true);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !turnosData) {
    return <div>Error al cargar el asesor</div>;
  }
  return (
    <NavBarAsesor color="bg-blue">
      <div className="flex z-20 w-full screenSet justify-around">
        <div className="mt-5 z-20 w-3/6 screenSet">
          <Card color="bgWhiteColor" className="z-20">
            <div className="w-full cardHeight">
              <div className="w-full h-full flex flex-col justify-start items-center">
                <h1 className="h-auto text-4xl font-bold">Como va tu día</h1>
                <div className="flex mt-10 justify-center flex-wrap">
                  <div className="w-60 mb-10 flex flex-col justify-center items-center">
                    <p className="font-bold text-green text-6xl">
                      {turnos.length}
                    </p>
                    <h2 className="text-xl font-semibold">Turnos Atendidos</h2>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-60 mb-10 flex flex-col justify-center items-center">
                      <p className="font-bold text-orange text-6xl">
                        {numeroPrioritarios}
                      </p>

                      <h2 className="text-xl font-semibold">Prioritarios</h2>
                      <h3 className="text-2xl text-purple font-semibold">
                        {tiempoPromedioPrioritarios == "NaN:NaN"
                          ? "00:00"
                          : tiempoPromedioPrioritarios}
                      </h3>
                    </div>
                    <div className="w-60 mb-10 flex flex-col justify-center items-center">
                      <p className="font-bold text-orange text-6xl">
                        {buenagente}
                      </p>
                      <h2 className="text-xl font-semibold">Buena Gente</h2>
                      <h3 className="text-2xl text-purple font-semibold">
                        {tiempoPromedioBuenaGente == "NaN:NaN"
                          ? "00:00"
                          : tiempoPromedioBuenaGente}
                      </h3>
                    </div>
                    <div className="w-60 mb-10 flex flex-col justify-center items-center">
                      <p className="font-bold text-orange text-6xl">{normal}</p>
                      <h2 className="text-xl font-semibold">Cliente Normal</h2>
                      <h3 className="text-2xl text-purple font-semibold">
                        {tiempoPromedioClienteNormal == "NaN:NaN"
                          ? "00:00"
                          : tiempoPromedioClienteNormal}
                      </h3>
                    </div>
                  </div>
                  <div className="w-60 mb-10 flex flex-col justify-center items-center">
                    <p className="font-bold text-green text-6xl">
                      {tiempoPromedio == "NaN:NaN" ? "00:00" : tiempoPromedio}
                    </p>
                    <h2 className="text-xl font-semibold">Tiempo Promedio</h2>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-5 z-20 w-2/5 screenSet">
          <Card color="bgWhiteColor" className="z-20">
            <div className="w-full cardHeight">
              <div className="w-full h-full flex flex-col justify-start items-center">
                <h1 className="h-auto text-4xl font-bold">Gestión de Turnos</h1>
                <div className="flex flex-col mt-10">
                  <div className="flex flex-col justify-center items-center">
                    {turnoActual.turno && (
                      <p className="font-bold text-blue text-6xl">
                        {turnoActual.turno}
                      </p>
                    )}
                    {!turnoActual.turno && (
                      <p className="font-bold text-blue text-4xl">
                        No hay turnos
                      </p>
                    )}
                    <h2 className="text-xl font-semibold">Turno Actual</h2>
                  </div>

                  <div className="flex w-full flex-wrap mt-10 gap-5">
                    <button
                      className="w-auto font-semibold px-5 h-10 rounded-full bg-pink"
                      onClick={handleTerminarTurno}
                    >
                      Terminar
                    </button>
                    <button
                      className="w-auto font-semibold px-5 h-10 rounded-full bg-green"
                      onClick={handleSiguienteTurno}
                    >
                      Siguiente
                    </button>
                    <button
                      onClick={handleNoAtendido}
                      className="w-auto font-semibold px-5 h-10 rounded-full bg-purple"
                    >
                      No Atendido
                    </button>
                  </div>
                  <table className="w-full mt-10">
                    <thead>
                      <tr>
                        <th className="text-3xl">Turnos en Cola</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listTurnos && Array.isArray(listTurnos)
                        ? listTurnos.map((turno) => (
                            <tr key={turno.id} className="text-2xl">
                              <td className="flex justify-center">
                                {turno.categoria === 0
                                  ? "PR"
                                  : turno.categoria === 1
                                  ? "BG"
                                  : "CN"}
                                {turno.numeroTurno.toString().padStart(3, "0")}
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {openModal == true ? (
        <div className="flex w-full z-30 h-screen bg-black bg-opacity-70 absolute top-0 left-0">
          <div className="flex w-full justify-center items-center">
            <div className="w-full flex flex-col items-center mt-10 justify-around">
              <div className="flex flex-col w-6/12">
                <Card>
                  {!errorMessage && (
                    <div className="flex flex-col w-6/12 justify-center items-center">
                      <h1 className="text-4xl font-bold text-center mt-10">
                        Turno Terminado Exitosamente
                      </h1>
                      <p className="text-xl text-center mt-5">
                        ¡Gracias por ayudarnos a mejorar nuestro servicio!
                      </p>
                      <button
                        className="z-40 bg-blue hover:bg-blue text-white mt-5 font-bold py-2 px-4 rounded"
                        onClick={handleCloseModal}
                      >
                        Aceptar
                      </button>
                    </div>
                  )}
                  {errorMessage && (
                    <div className="flex flex-col w-6/12 justify-center items-center">
                      <h1 className="text-4xl font-bold text-center mt-10">
                        {errorMessage}
                      </h1>
                      <button
                        className="z-40 bg-blue hover:bg-blue text-white mt-5 font-bold py-2 px-4 rounded"
                        onClick={handleCloseModal}
                      >
                        Aceptar
                      </button>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="absolute z-10 bottom-0 flex justify-center ">
        <Image src={Bg} width={2000}></Image>
      </div>
    </NavBarAsesor>
  );
}

export default AsesorPage;
