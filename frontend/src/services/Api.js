const API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = "https://code-drop-production.up.railway.app/api";

export const sendData = async (text) => {
  try {
    const response = await fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
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

      return await response.json(); // Retorna a resposta do backend
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