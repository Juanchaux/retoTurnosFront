/**
 * Función asincrónica para obtener el último turno atendido por un asesor mediante una solicitud GET al servidor.
 * @param {string} jwt Token de autenticación JWT del asesor.
 * @returns {Promise<object>} Promesa que se resuelve con los datos del último turno atendido por el asesor o un objeto de error.
 */

async function getUltimoTurnoAsesor(jwt) {
    const response = await fetch(`https://backendsistematurnos.azurewebsites.net/TurnosAtendidos/ultimoTurnoAsesor/${jwt}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });

    if (!response.ok) {
        return { error: 'Hubo un problema al obtener el usuario.', status: response.status };
    }

    const data = await response.json();
    return data;
};

export default getUltimoTurnoAsesor;