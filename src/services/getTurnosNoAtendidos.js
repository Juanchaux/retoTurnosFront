/**
 * Función asincrónica para obtener los turnos no atendidos mediante una solicitud GET al servidor.
 * @param {string} jwt Token de autenticación JWT para la solicitud.
 * @returns {Promise<object>} Promesa que se resuelve con los datos de los turnos no atendidos o un objeto de error.
 */

async function getTurnosNoAtendidos(jwt) {
    const response = await fetch(`https://backendsistematurnos.azurewebsites.net/Turno/turnosNoAtendidos/`, {
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

export default getTurnosNoAtendidos;