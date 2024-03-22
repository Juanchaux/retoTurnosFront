/**
 * Función asincrónica para obtener un asesor mediante una solicitud GET al servidor.
 * @param {string} jwt Token de autenticación JWT para la solicitud.
 * @returns {Promise<object>} Promesa que se resuelve con los datos del asesor o un objeto de error.
 */

async function getAsesor(jwt) {
    const response = await fetch(`https://backendsistematurnos.azurewebsites.net/Asesor/${jwt}`, {
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

export default getAsesor;