import { useState } from "react";
import Image from "next/image";
import Corner from "@/Media/Corner.png";
import Card from "@/components/card";
import Link from "next/link";
import Button from "@/components/button";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function login() {
    try {
      const response = await fetch(
        "https://backendsistematurnos.azurewebsites.net/Asesor/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Usuario: username,
            Contrasena: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Hubo un problema al iniciar sesión.");
      }

      return response.json();
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
      throw error;
    }
  }

  const handleLogin = async () => {
    try {
      const response = await login();
      if (response) {
        sessionStorage.setItem("Session", response.jwt);
        window.location.href = "/asesor";
      }
    } catch (error) {
      setErrorMessage("Usuario o contraseña incorrectos");
      setErrorModalVisible(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const closeModal = () => {
    setErrorModalVisible(false);
  };

  return (
    <>
      <div className="w-full mx-auto px-4 py-8">
        <div className="flex w-full justify-center items-center">
          <div className="flex w-1/2 z-20">
            <Card>
              <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-center mt-10 mb-8">
                  Inicio de Sesión
                </h1>
                <div className="w-4/5">
                  <div className="mb-6 w-full">
                    <label htmlFor="username" className="block text-xl mb-2">
                      Usuario
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="mt-1 p-3 border rounded-md w-full text-lg focus:outline-none"
                      placeholder="Tu nombre de usuario"
                      autoComplete="off"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <div className="mb-6 w-full">
                    <label htmlFor="password" className="block text-xl mb-2">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="mt-1 p-3 border rounded-md w-full text-lg focus:outline-none"
                      placeholder="Tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <div className="flex w-full flex-col items-center justify-center">
                    <Button color="bgBlueColor" onClick={handleLogin}>
                      Ingresar
                    </Button>
                    <Link href="/">
                      <p className="pt-5 border-b-2 hover:border-blue">
                        {"Volver al inicio"}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-10 right-0 m-0 flex justify-center">
        <Image src={Corner} alt="Logo" width={1000} />
      </div>
      {errorModalVisible == true ? (
        <div className="flex w-full z-30 h-screen bg-black bg-opacity-70 absolute top-0 left-0">
          <div className="flex w-full justify-center items-center">
            <div className="w-full flex flex-col items-center mt-10 justify-around">
              <div className="flex flex-col w-6/12">
                <Card>
                  <div className="flex flex-col w-6/12 justify-center items-center">
                    <h1 className="text-4xl mb-5 font-bold text-center mt-10">
                      Usuario o contraseña incorrectos
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
  );
}

export default LoginPage;
