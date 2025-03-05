import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./componentes/header";

function SignUpPage() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState(""); // O email ainda não está sendo usado no backend, mas pode ser armazenado no futuro.
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("code-drop-production.up.railway.app/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            setMensagem("Usuário cadastrado com sucesso! Redirecionando...");
            setTimeout(() => navigate("/login"), 2000);
        } else {
            setMensagem(data.error || "Erro ao cadastrar usuário.");
        }
    };

    return (
        <>
            <Header />
            <form onSubmit={handleSubmit} className="border-solid w-2/4 h-96 flex flex-col justify-center place-items-center gap-5" >
                <input type="text" name="nome" id="nome" required placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                <input type="email" name="email" id="email" required placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="senha" id="senha" required placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <input type="submit" value="Enviar" />
            </form>
            {mensagem && <p className="text-center mt-4">{mensagem}</p>}
        </>
    );
}

export default SignUpPage;