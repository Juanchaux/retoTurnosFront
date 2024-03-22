/**
 * Función asincrónica para llamar a un turno no atendido mediante una solicitud POST al servidor.
 * @param {string} jwt Token de autenticación JWT.
 * @param {number} turnoId ID del turno no atendido que se desea llamar.
 * @returns {Promise<object>} Promesa que se resuelve con los datos del turno llamado o lanza un error en caso de problemas.
 */

async function llamarNoAtendido(jwt, turnoId) {
    try {
        const response = await fetch('https://backendsistematurnos.azurewebsites.net/Turno/llamarTurnoNoAtendido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ TurnoId: turnoId }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        throw new Error(`Error al llamar turno: ${error.message}`);
    }
}

export default llamarNoAtendido;
