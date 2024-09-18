const BASE_API_URL = "http://localhost:3333";
// Função para obter o token do localStorage
const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Função para buscar os dados do usuário
  export const getUserData = async () =>  {
    const token = getToken(); // Pega o token do localStorage
    if (!token) {
      console.error('Token não encontrado');
      return;
    }
  
    try {
      const response = await fetch(`${BASE_API_URL}/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Passa o token no header
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do usuário');
      }
  
      const userData = await response.json(); // Converte a resposta para JSON
      return userData; // Retorna os dados do usuário
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };
  