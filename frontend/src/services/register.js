// services/register.js
const BASE_API_URL = "http://localhost:3333";

export async function registerUser(userData) {
    try {
        const response = await fetch(`${BASE_API_URL}/user/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Captura o corpo da resposta
            const errorMessage = errorData.message || 'Erro ao criar usuário'; // Obtém a mensagem de erro, se disponível
            
            console.log(errorMessage);
            alert('Usuário já existe');

            throw new Error(errorMessage);
        }

        const data = await response.json();
        alert('Cadastro Confirmado')
        return data;
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        throw error;
    }
}
