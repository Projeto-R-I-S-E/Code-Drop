import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Header from './componentes/header'

const ViewCode = () => {
  const { page_id } = useParams(); // Obtém o ID da URL
  console.log("🔍 page_id recebido no frontend:", page_id);

  useEffect(() => {
    fetch(`https://code-drop-production.up.railway.app/api/view/${page_id}`)
      .then(res => res.json())
      .then(data => {
        console.log("📝 Resposta do backend:", data);
        if (data.error) {
          setError("Texto não encontrado.");
        } else {
          setText(data.text);
        }
      })
      .catch(err => {
        console.log("❌ Erro na requisição:", err);
        setError("Erro ao carregar o texto.");
      });
  }, [page_id]);

  return (
    <>
      <Header />
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
    </>
  );
};

export default ViewCode;