const API_URL = 'http://localhost:5000/api';

export const fetchHello = async () => {
  const response = await fetch(`${API_URL}/hello`);
  const data = await response.json();
  return data;
};