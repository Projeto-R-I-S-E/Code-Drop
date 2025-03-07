import { useState, useEffect } from "react";
import { sendData, getUserLinks } from "./services/Api";
import Modal from "./modal";
import Header from "./componentes/header";
import Footer from "./componentes/footer";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [token] = useState(localStorage.getItem("token") || "");
  const [userLinks, setUserLinks] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (token) {
      fetchUserLinks();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchUserLinks = async () => {
    const linksData = await getUserLinks(token);
    if (linksData && linksData.links) {
      setUserLinks(linksData.links);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem("token"); 
    const response = await sendData(text, storedToken); 

    if (response && response.link) {
      console.log("Resposta do backend:", response);
      setLink(response.link);
      setIsModalOpen(true);
      fetchUserLinks();
    } else {
      console.error("Erro: resposta inválida do backend.", response);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="m-10">
        <div className="flex gap-48">
          {/* Formulário de envio */}
          <form onSubmit={handleSubmit} method="post">
            <textarea
              name="code"
              id="code"
              cols="70"
              rows="15"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border-solid border-gray-300 text-2xl resize-none rounded-xl p-2"
              placeholder="Digite seu código"
              required
            ></textarea>
            <br />
            <input
              type="submit"
              value="Enviar código"
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            />
          </form>

          {/* Modal de compartilhamento */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-xl font-bold">Compartilhar código</h2>
            <p>
              <a href={link} id="linktext">
                {link}
              </a>
            </p>
            <br />
            <button onClick={() => setIsModalOpen(false)}>Fechar</button>
            <button onClick={handleCopy}>
              {copied ? "Copiado!" : "Copiar Link"}
            </button>
          </Modal>

          {/* Listagem de Links */}
          <div className="border-solid h-92 overflow-y-auto border-gray-200 w-full p-10">
            <h2 className="text-4xl font-bold text-blue-500 m-0">
              Listagem de links
            </h2>
            <hr />
            {userLinks.length > 0 ? (
              userLinks.map((linkItem) => (
                <a key={linkItem.id} href={linkItem.url} className="text-2xl mt-5 block">
                  {linkItem.url}
                </a>
              ))
            ) : (
              <p className="text-gray-500">Nenhum link gerado ainda.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
