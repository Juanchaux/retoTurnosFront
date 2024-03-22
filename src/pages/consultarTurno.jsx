import React from "react";
import NavBar from "@/components/navBar";
import Image from "next/image";
import Bg from "@/Media/Bg.png";
import getUltimos10 from "@/services/getUltimos10";
import { useQuery } from "react-query";

function ConsultarTurnoPage() {
  const {
    data: turnosData,
    isLoading,
    isError,
  } = useQuery(["turnosAtendidos", "ultimos10Turnos"], getUltimos10);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !turnosData) {
    return <div>Error al cargar los turnos</div>;
  }

  return (
    <>
      <NavBar />
      <div className="flex screenSet z-20">
        <div className="flex flex-col z-20 w-1/2 flex-max justify-center items-center">
          <h1 className="text-7xl font-bold yellowColor">Turno llamado</h1>
          <h1 className="text-9xl font-bold">
            {turnosData[0].turno.categoria == 0
              ? "PR"
              : turnosData[0].turno.categoria == 1
              ? "BG"
              : "CN"}
            {turnosData[0].turno.numeroTurno.toString().padStart(3, "0")}
          </h1>
        </div>
        <div className="flex w-1/2 items-center justify-center z-20">
          <table className="w-full">
            <thead>
              <tr className="text-3xl">
                <th>Turno</th>
              </tr>
            </thead>
            <tbody>
              {turnosData.map((turno) => (
                <tr key={turno.id} className="text-2xl">
                  <td className="flex justify-center">
                    {turno.turno.categoria == 0
                      ? "PR"
                      : turno.turno.categoria == 1
                      ? "BG"
                      : "CN"}
                    {turno.turno.numeroTurno.toString().padStart(3, "0")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-3xl">Asesor</th>
              </tr>
            </thead>
            <tbody>
              {turnosData.map((turno) => (
                <tr key={turno.id} className="text-2xl">
                  <td className="flex justify-center">
                    {"Asesor " + turno.idAsesor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-3xl">Estado</th>
              </tr>
            </thead>
            <tbody>
              {turnosData.map((turno) => (
                <tr key={turno.id} className="text-2xl">
                  <td className="flex justify-center">{turno.turno.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="absolute z-10 bottom-0 flex justify-center items-center">
        <Image src={Bg} alt="bg" />
      </div>
    </>
  );
}

export default ConsultarTurnoPage;
