/**
 * Función asincrónica para obtener los turnos atendidos en el día mediante una solicitud GET al servidor.
 * @param {string} jwt Token de autenticación JWT para la solicitud.
 * @returns {Promise<object>} Promesa que se resuelve con los datos de los turnos del día o un objeto de error.
 */

async function getTurnosDia(jwt) {
    const response = await fetch(`https://backendsistematurnos.azurewebsites.net/TurnosAtendidos/turnos-atendidos/${jwt}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });

    if (!response.ok) {
        return { error: 'Hubo un problema al obtener los turnos del día.', status: response.status };
    }

    const data = await response.json();
    return data;
};

export default getTurnosDia;
