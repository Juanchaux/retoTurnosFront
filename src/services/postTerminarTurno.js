const terminarTurno = async (jwt, TurnoId) => {
    try {
        const response = await fetch(`https://backendsistematurnos.azurewebsites.net/Turno/terminarTurno`, {
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

export default terminarTurno;
