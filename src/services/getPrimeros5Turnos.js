/**
 * Función asincrónica para obtener los primeros 5 turnos mediante una solicitud GET al servidor.
 * @param {string} jwt Token de autenticación JWT para la solicitud.
 * @returns {Promise<object>} Promesa que se resuelve con los datos de los primeros 5 turnos o un objeto de error.
 */

async function getPrimeros5(jwt) {


    const response = await fetch(`https://backendsistematurnos.azurewebsites.net/Turno/primeros5Turnos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    });

    if (!response.ok) {
        return { error: 'Hubo un problema al obtener los turnos del día.', status: response.status };
    }

    const data = await response.json();
    return data;
};

export default getPrimeros5;
