/**
 * Función asincrónica para obtener el historial de turnos mediante una solicitud POST al servidor.
 * @param {string} jwt Token de autenticación JWT para la solicitud.
 * @param {string} fechaInicio Fecha de inicio del rango de búsqueda en formato YYYY-MM-DD.
 * @param {string} fechaFin Fecha de fin del rango de búsqueda en formato YYYY-MM-DD.
 * @returns {Promise<object>} Promesa que se resuelve con los datos del historial de turnos o un objeto de error.
 */

async function getHistorial(jwt, fechaInicio, fechaFin) {
    const requestData = {
        Jwt: jwt,
        FechaInicio: fechaInicio,
        FechaFin: fechaFin
    };

    const response = await fetch(`https://backendsistematurnos.azurewebsites.net/consultarHistorial`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(requestData)
    });

    if (!response.ok) {
        return { error: 'Hubo un problema al obtener los turnos del día.', status: response.status };
    }

    const data = await response.json();
    return data;
};

export default getHistorial;
