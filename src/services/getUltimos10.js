/**
 * Función asincrónica para obtener los últimos 10 turnos atendidos mediante una solicitud GET al servidor.
 * @returns {Promise<object>} Promesa que se resuelve con los datos de los últimos 10 turnos atendidos o un objeto de error.
 */

async function getUltimos10() {
    const response = await fetch(`https://backendsistematurnos.azurewebsites.net/TurnosAtendidos/ultimos10Turnos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        return { error: 'Hubo un problema al obtener los turnos del día.', status: response.status };
    }

    const data = await response.json();
    return data;
};

export default getUltimos10;
