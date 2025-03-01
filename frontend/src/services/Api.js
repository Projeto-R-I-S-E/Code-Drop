const API_URL = 'https://code-drop-production.up.railway.app/api';

export const fetchHello = async () => {
  const response = await fetch(`${API_URL}/hello`);
  const data = await response.json();
  return data;
};

export const sendData = async (text) => {
  try {
    const response = await fetch('${API_URL}/submit', {
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