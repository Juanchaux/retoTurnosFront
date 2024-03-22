import React, { createContext, useContext, useState } from "react";

const AsesorContext = createContext();

export const useAsesorContext = () => useContext(AsesorContext);

export const AsesorProvider = ({ children }) => {
  const [nombreAsesor, setNombreAsesor] = useState("");
  const [turnos, setTurnos] = useState([]);
  const [prioritariosTurnos, setPrioritariosTurnos] = useState(0);
  const [buenaGenteTurnos, setBuenaGenteTurnos] = useState(0);
  const [clienteNormalTurnos, setClienteNormalTurnos] = useState(0);
  const [tiempoPromedioPrioritarios, setTiempoPromedioPrioritarios] =
    useState("");
  const [tiempoPromedioBuenaGente, setTiempoPromedioBuenaGente] = useState("");
  const [tiempoPromedioClienteNormal, setTiempoPromedioClienteNormal] =
    useState("");
  const [tiempoPromedio, setTiempoPromedio] = useState("");

  const calcularTiempoPromedio = (turnosData) => {
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

    return `${minutos.toString().padStart(2, "0")}:${segundos
      .toString()
      .padStart(2, "0")}`;
  };

  const contextValue = {
    turnos,
    nombreAsesor,
    setTurnos,
    setNombreAsesor,
  };

  return (
    <AsesorContext.Provider value={contextValue}>
      {children}
    </AsesorContext.Provider>
  );
};
