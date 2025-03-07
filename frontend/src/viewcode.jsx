import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./componentes/header";

const ViewCode = () => {
  const { id } = useParams();
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await fetch(`https://code-drop-production.up.railway.app/api/view/${id}`);
        const data = await response.json();

        if (response.ok) {
          setText(data.text);
        } else {
          setText("Erro ao carregar o texto.");
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setText("Erro de conexão com o servidor.");
      }
    };

    fetchText();
  }, [id]);

  return (
    <>
      <Header />
      <div className="container">
        {text ? (
          <>
            <form action="https://drop-code.netlify.app/">
              <input type="submit" value="Voltar" className="bg-blue-800 text-white border-2 border-white px-6 py-2 rounded-md cursor-pointer" />
            </form>
            <h1 className="text-black font-mono">Código:</h1>
            <textarea name="returnedCode" id="returnedCode" cols="70" rows="15" value={text} readOnly
            className="border-solid border-gray-200 text-2xl resize-none"></textarea>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </>
  );
};

export default ViewCode;