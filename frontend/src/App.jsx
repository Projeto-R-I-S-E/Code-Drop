import { useState } from "react";
import { sendData } from "./services/Api";
import Modal from "./modal";
import Header from "./componentes/header"

function App() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [text, setText] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await sendData(text);
    setLink(response.link); 
    setIsModalOpen(true);
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Header></Header>
      <main className="w-full">
        <div className="flex gap-48">
          <form onSubmit={handleSubmit} method="post">  
            <textarea name="code" id="code" cols="70" rows="15" 
            value={text} onChange={(e) => setText(e.target.value)}
            className="border-solid border-gray-300 text-2xl resize-none" placeholder="Digite seu código" required></textarea>
            <br />
            <input type="submit" value="Enivar código" className="mt-4 p-2 bg-blue-500 text-white rounded"/>
          </form>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-xl font-bold">Compartilhar código</h2>
            <p><a href={link} id="linktext">{link}</a></p>
            <br />
            <button onClick={() => setIsModalOpen(false)}>Fechar</button>
            <button onClick={handleCopy}>
              {copied ? "Copiado!" : "Copiar Link"}
          </button>
          </Modal>
          <div className="border-solid border-gray-200 w-full p-10">
            <h2 className="text-4xl font-bold text-blue-500 m-0">Listagem de links</h2>
            <hr/>
            <a href="" className="text-2xl mt-5">exemplo</a>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
