import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewCode = () => {
  const { page_id } = useParams();
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await fetch(`https://code-drop-production.up.railway.app/api/view/${page_id}`);
        const data = await response.json();

        if (response.ok) {
          setText(data.text);
        } else {
          setText("Erro ao carregar o texto.");
        }
      } catch (error) {
        setText("Erro de conexão com o servidor.");
      }
    };

    fetchText();
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