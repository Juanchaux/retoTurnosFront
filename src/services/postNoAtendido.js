/**
 * Función asincrónica para marcar un turno como no atendido mediante una solicitud POST al servidor.
 * @param {string} jwt Token de autenticación JWT.
 * @param {number} TurnoId ID del turno que se desea marcar como no atendido.
 * @returns {Promise<object>} Promesa que se resuelve con los datos del turno marcado como no atendido o lanza un error en caso de problemas.
 */

const postNoAtendido = async (jwt, TurnoId) => {
    try {
        const response = await fetch(`https://backendsistematurnos.azurewebsites.net/Turno/noAtendido`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ TurnoId })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al terminar el turno: ${errorData}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Error al terminar el turno: ${error.message}`);
    }
};

export default postNoAtendido;
