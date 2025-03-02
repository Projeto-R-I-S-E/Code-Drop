import React, { useEffect, useState } from 'react';

function ViewCode() {
  const [text, setText] = useState(null);
  const pageId = window.location.pathname.split('/').pop();  // Pega o page_id da URL

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await fetch(`code-drop-production.up.railway.app/api/get_text/${pageId}`);
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
          <form action="https://drop-code.netlify.app/">
            <input type="submit" value="Voltar" />
          </form>
          <h1>Código:</h1>
          <textarea name="returnedCode" id="returnedCode" cols="70" rows="15" value={text} readOnly
          className="border-solid border-gray-300 text-2xl resize-none"></textarea>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default ViewCode;