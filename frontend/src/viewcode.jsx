import React, { useEffect, useState } from 'react';

function ViewCode() {
  const [text, setText] = useState(null);
  const pageId = window.location.pathname.split('/').pop();  // Pega o page_id da URL

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/get_text/${pageId}`);
        if (!response.ok) {
          throw new Error('Página não encontrada');
        }
        const data = await response.json();
        setText(data.text);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchText();
  }, [pageId]);

  return (
    <div className="container">
      {text ? (
        <>
          <h1>Texto Inserido</h1>
          <p>{text}</p>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default ViewCode;