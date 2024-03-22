import NavBar from "../components/navBar";
import Image from "next/image";
import Bg from "../Media/Bg.png";
import Card from "@/components/card";
import { useState, useEffect } from "react";
import Button from "@/components/button";

function SolicitarTurnoPage() {
  const [openModal, setOpenModal] = useState(false);
  const [turno, setTurno] = useState("");
  const [categoriaTurno, setCategoriaTurno] = useState("0");

  async function createTurnoMutation(categoria) {
    try {
      const response = await fetch(
        "https://backendsistematurnos.azurewebsites.net/Turno/solicitarTurno",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: categoria,
        }
      );

      if (!response.ok) {
        throw new Error("Error al solicitar el turno");
      }

      const data = await response.json();
      const turno = data.turno;
      setTurno(
        `${
          turno.categoria == 0 ? "PR" : turno.categoria == 1 ? "BG" : "CN"
        }${turno.numeroTurno.toString().padStart(3, "0")}`
      );

      return turno;
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
      throw error;
    }
  }

  const Solicitar = () => {
    createTurnoMutation(categoriaTurno);
    handleOpenModal();
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openModal]);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <NavBar />
      <div className="flex w-full justify-center items-center ">
        <div className="w-full flex flex-col items-center mt-4 justify-around">
          <div className="flex flex-col w-full">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-4xl w-6/12 font-bold text-center mt-10">
                ¡Bienvenido a nuestro sistema de solicitud de turno!
              </h1>
              <p className="W-full  w-3/4 text-xl text-center mt-5">
                Estamos encantados de tenerte aquí. En este espacio, podrás
                gestionar tus turnos de manera rápida y sencilla. Nos esforzamos
                por brindarte la mejor experiencia posible para que puedas
                agendar tus citas de forma eficiente y sin complicaciones.
              </p>
            </div>
            <div className="flex w-full justify-evenly items-center mt-20">
              <form className=" w-auto">
                <div className="flex w-full flex-col">
                  <label className="text-2xl font-bold pr-10">
                    Selecciona la categoría del turno
                  </label>
                  <div className="flex w-full">
                    <select
                      className="w-full border-2 border-black rounded-3xl p-2 pr-8 appearance-none mt-2 focus:outline-none text-lg"
                      value={categoriaTurno}
                      onChange={(e) => setCategoriaTurno(e.target.value)}
                    >
                      <option value="0">Prioritario</option>
                      <option value="1">Buena Gente</option>
                      <option value="2">Cliente Normal</option>
                    </select>
                    <div className="relative top-1 right-12 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </form>
              <div className="flex w-52 justify-center items-center">
                <Button onClick={Solicitar}>Solicitar Turno</Button>
              </div>
            </div>
            <Image src={Bg} width={2000} />
          </div>
        </div>
      </div>
      {openModal ? (
        <div className="flex w-full h-screen bg-black  bg-opacity-70 absolute top-0 left-0 ">
          <div className="flex w-full justify-center items-center">
            <div className="w-full flex flex-col items-center mt-10 justify-around">
              <div className="flex flex-col w-6/12">
                <Card>
                  <div className="flex flex-col w-6/12 justify-center items-center">
                    <h1 className="text-4xl font-bold text-center mt-10">
                      Tu turno es: {turno + ""}
                      {turno[0] === "P"
                        ? " (Prioritario)"
                        : turno[0] === "B"
                        ? " (Buena Gente)"
                        : turno[0] === "C"
                        ? " (Cliente Normal)"
                        : null}
                    </h1>
                    <p className="text-xl text-center mt-5">
                      ¡Gracias por confiar en nosotros! Serás atendido por un
                      asesor en breve para atender tu solicitud.
                    </p>
                    <Button onClick={handleOpenModal}>Aceptar</Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SolicitarTurnoPage;
