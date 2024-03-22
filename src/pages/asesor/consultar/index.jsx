import React, { useEffect, useState } from "react";
import Image from "next/image";
import Bg from "@/Media/Corner.png";
import Card from "@/components/card";
import NavBarAsesor from "@/components/navBarAsesor";
import Button from "@/components/button";
import getHistorial from "@/services/getHistorial";

function ConsultarPage() {
  const [historial, setHistorial] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
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

  const handleConsultarHistorial = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);
    const fechaInicioFormateada = `${fechaInicio}T00:00:00`;
    const fechaFinFormateada = `${fechaFin}T23:59:59`;

    try {
      const data = await getHistorial(
        session,
        fechaInicioFormateada,
        fechaFinFormateada
      );
      setHistorial(data);
    } catch (error) {
      setError("Hubo un problema al obtener el historial de consultas.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (historial && Array.isArray(historial)) {
      const prioritariosTurnos = historial.filter(
        (turno) => turno.turno.categoria === 0
      );
      const buenaGenteTurnos = historial.filter(
        (turno) => turno.turno.categoria === 1
      );
      const clienteNormalTurnos = historial.filter(
        (turno) => turno.turno.categoria === 2
      );

      setPrioritarios(prioritariosTurnos.length);
      setBuenaGente(buenaGenteTurnos.length);
      setNormal(clienteNormalTurnos.length);

      const duracionTotalSegundos = historial.reduce((total, turno) => {
        const horaLlamada = new Date(turno.turno.horaLlamada);
        const horaTermino = new Date(turno.turno.horaTermino);

        const diferenciaTiempo = horaTermino - horaLlamada;

        const duracionSegundos = diferenciaTiempo / 1000;
        return total + duracionSegundos;
      }, 0);

      const tiempoPromedioSegundos = duracionTotalSegundos / historial.length;

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
  }, [historial]);

  return (
    <>
      <NavBarAsesor color="bg-blue" />
      <div className="flex z-20 w-full screenSet justify-around">
        <div className="mt-5 z-20 w-2/5 screenSet">
          <Card color="bgWhiteColor" className="z-20">
            <div className="w-full cardHeight">
              <div className="w-full h-full flex flex-col justify-start items-center">
                <h1 className="h-auto text-4xl font-bold">
                  Consulta tu historial
                </h1>
                <form
                  className="w-4/5 mt-10"
                  onSubmit={handleConsultarHistorial}
                >
                  <div className="mb-6 w-full">
                    <label htmlFor="from" className="block text-xl mb-2">
                      Desde
                    </label>
                    <input
                      type="date"
                      id="from"
                      name="from"
                      className="mt-1 p-3 border rounded-md w-full text-lg focus:outline-none"
                      max={new Date().toISOString().split("T")[0]}
                      placeholder="Desde"
                      autoComplete="off"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                    />
                  </div>
                  <div className="mb-6 w-full">
                    <label htmlFor="to" className="block text-xl mb-2">
                      Hasta
                    </label>
                    <input
                      type="date"
                      id="to"
                      name="to"
                      className="mt-1 p-3 border rounded-md w-full text-lg focus:outline-none"
                      placeholder="Hasta"
                      max={new Date().toISOString().split("T")[0]}
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                    />
                  </div>
                  <div className="flex w-full flex-col items-center justify-center">
                    <Button color="bg-blue" type="submit" disabled={isLoading}>
                      Consultar
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-5 z-20 w-2/4 screenSet">
          <Card color="bgWhiteColor" className="z-20">
            <div className="w-full cardHeight">
              <div className="w-full h-full flex flex-col justify-start items-center">
                <h1 className="h-auto text-4xl font-bold text-center">
                  Feedback
                </h1>
                <div className="flex mt-10 justify-center flex-wrap">
                  <div className="w-60 mb-10 flex flex-col justify-center items-center">
                    <p className="font-bold text-green text-6xl">
                      {historial.length}
                    </p>
                    <h2 className="text-xl font-semibold">Turnos Atendidos</h2>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="w-60 mb-10 flex flex-col justify-center items-center">
                    <p className="font-bold text-orange text-6xl">
                      {prioritarios}
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
          </Card>
        </div>
      </div>

      <div className="absolute z-10 bottom-0 right-0 flex justify-center ">
        <Image src={Bg} width={1000}></Image>
      </div>
    </>
  );
}

export default ConsultarPage;
