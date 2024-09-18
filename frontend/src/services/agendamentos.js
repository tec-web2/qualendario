const BASE_API_URL = "http://localhost:3333";


export async function getQuadraByName(name) {
    try {
        const response = await fetch(`${BASE_API_URL}/quadra/list`);
        const allQuadras = await response.json();
        return allQuadras.find(quadra => quadra.nome === name);
    } catch (error) {
        console.error('Erro ao buscar quadra pelo nome:', error);
        throw error;
    }
}

export async function checkAvailability(quadraId, date) {
    try {
        const response = await fetch(`${BASE_API_URL}/agendamento/list`);
        const allAgendamentos = await response.json();

        // Filtro para obter apenas os agendamentos da quadra e data selecionadas
        const filteredAgendamentos = allAgendamentos.filter(
            (agendamento) =>
                agendamento.quadraId === quadraId &&
                new Date(agendamento.dataHoraInicio).toISOString().startsWith(date)
        );

        const allSlots = [
            '08:00', '09:00', '10:00', '11:00',
            '14:00', '15:00', '16:00', '17:00',
            '18:00', '19:00', '20:00', '21:00', 
        ]; // Horários possíveis

        const bookedSlots = filteredAgendamentos.map(
            (agendamento) => new Date(agendamento.dataHoraInicio).toISOString().slice(11, 16)
        );

        const availableSlots = allSlots.filter(
            (slot) => !bookedSlots.includes(slot)
        );

        return availableSlots.map(slot => ({ time: slot }));
    } catch (error) {
        console.error('Erro ao verificar disponibilidade:', error);
        return [];
    }
}


// Criar um novo agendamento
export async function createAgendamento(quadraId, date, time) {
    const token = localStorage.getItem('token');
    
    try {
        const data = {
            quadraId,
            dataHoraInicio: `${date}T${time}:00.000Z`,
            dataHoraFim: `${date}T${(parseInt(time.split(':')[0]) + 1).toString().padStart(2, '0')}:${time.split(':')[1]}:00.000Z`,
        };

        const response = await fetch(`${BASE_API_URL}/agendamento/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Erro ao criar agendamento');
        }
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        throw error;
    }
}