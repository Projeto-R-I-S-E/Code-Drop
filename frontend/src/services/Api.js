const API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = "https://code-drop-production.up.railway.app/api";

export const sendData = async (text) => {
  try {
    // Recupera o token JWT do localStorage
    const token = localStorage.getItem('token'); 

    // Verifica se o token está presente
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    // Envia a requisição para o backend
    const response = await fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Envia o token no cabeçalho
      },
      body: JSON.stringify({ text }),  // Envia o texto
    });

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    // Retorna o link gerado
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    return { error: error.message };  // Retorna o erro para ser tratado no frontend
  }
};

export async function registerUser(nome, email, senha) {
  try {
      const response = await fetch(`${API_BASE_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
          throw new Error(`Erro ao registrar: ${response.statusText}`);
      }

      return await response.json();
  } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      return null;
  }
}

export async function loginUser(email, senha) {
  try {
      const response = await fetch(`${API_BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
          throw new Error(`Erro ao fazer login: ${response.statusText}`);
      }

      return await response.json(); // Retorna o token JWT ou erro
  } catch (error) {
      console.error("Erro ao fazer login:", error);
      return null;
  }
}