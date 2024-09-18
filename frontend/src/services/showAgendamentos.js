const BASE_API_URL = "http://localhost:3333";

// Função para buscar agendamentos e filtrar pelo usuário logado
export const getUserAgendamentos = async (userId) => {
  try {
    const response = await fetch(`${BASE_API_URL}/agendamento/list`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar agendamentos');
    }

    const agendamentos = await response.json(); // Converte a resposta para JSON
    console.log(agendamentos)
    // Filtra os agendamentos que possuem o mesmo usuarioId que o do usuário logado
    const agendamentosUsuario = agendamentos.filter(
      (agendamento) => agendamento.usuarioId._id === userId
    );

    return agendamentosUsuario; // Retorna os agendamentos do usuário logado
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return [];
  }
};
