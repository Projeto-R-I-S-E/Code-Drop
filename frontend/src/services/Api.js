const API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = "https://code-drop-production.up.railway.app/api";

export async function sendData(text, token) {
  try {
    const response = await fetch("https://code-drop-production.up.railway.app/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "", // Certifique-se de enviar o token corretamente
      },
      body: JSON.stringify({ text }), // O backend pode estar esperando "text" ao invés de "code"
    });

    if (!response.ok) {
      console.error("Erro ao enviar dados:", response.status, response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    return null;
  }
}

export async function getUserLinks(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/links`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar links");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar links do usuário:", error);
    return null;
  }
}

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