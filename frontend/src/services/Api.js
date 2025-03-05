const API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = "https://code-drop-production.up.railway.app/api";

export const sendData = async (text) => {
  try {
    const token = localStorage.getItem('token');  // Obtém o token do localStorage, se presente

    const response = await fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',  // Adiciona o token no cabeçalho, se existir
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const data = await response.json();
    if (data.link) {
      return data;  // Retorna os dados contendo o link
    } else {
      throw new Error('Link não gerado');
    }
  } catch (error) {
    console.error(error);
    return { error: error.message };  // Retorna o erro
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