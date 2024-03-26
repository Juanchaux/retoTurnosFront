/**
 * Función asincrónica para obtener el siguiente turno mediante una solicitud GET al servidor.
 * @param {string} jwt Token de autenticación JWT para la solicitud.
 * @returns {Promise<object>} Promesa que se resuelve con los datos del siguiente turno o un objeto de error.
 */

const getSiguienteTurno = async (jwt) => {
  try {
    const response = await fetch(`https://backendsistematurnos.azurewebsites.net/Turno/siguienteTurno/${jwt}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: `Error al llamar al próximo turno: ${errorData}` };
    }

    return await response.json();
  } catch (error) {
    const errorData = await response.json();
    return { error: `Error al llamar al próximo turno: ${errorData}` };
  }
};

export default getSiguienteTurno;
