import { useState } from "react";
import { registerUser } from "./Api"; 
import Header from "./componentes/header";

function SignUpPage() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const result = await registerUser(nome, email, senha);
        if (result) {
            alert("Usuário registrado com sucesso!");
        } else {
            alert("Erro ao registrar usuário.");
        }
    }

    return (
        <>
            <Header />
            <form onSubmit={handleSubmit} className="border-solid w-2/4 h-96 flex flex-col justify-center place-items-center gap-5" >
                <input type="text" name="nome" id="nome" required placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                <input type="email" name="email" id="email" required placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="senha" id="senha" required placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <input type="submit" value="Enviar" />
            </form>
        </>
    );
}

export default SignUpPage;