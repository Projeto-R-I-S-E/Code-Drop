import { useState } from "react";
import { registerUser } from "../services/Api"; 

const SignUpPlace = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    async function handleSubmit(event) {
        event.preventDefault();
        const result = await registerUser(nome, email, senha);
        if (result) {
            alert("Usuário registrado com sucesso!");
            window.location.href = '/'
        } else {
            alert("Erro ao registrar usuário.");
        }
    }

    return (
        <main className="flex justify-center items-center h-screen w-full bg-white">
            <div className="bg-white p-8 rounded-md">
                <h1 className="text-2xl font-sans font-bold text-center">Sign up</h1>

                <form 
                    onSubmit={handleSubmit} 
                    className="w-2/4 h-96 flex flex-col justify-center items-center gap-5"
                >
                    <input 
                        type="text" 
                        name="nome" 
                        id="nome" 
                        required 
                        placeholder="Digite seu nome" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        className="border border-gray-300 rounded-md p-2 m-2"

                    />
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        required 
                        placeholder="Digite seu email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 m-2" 
                    />
                    <input 
                        type="password" 
                        name="senha" 
                        id="senha" 
                        required 
                        placeholder="Digite sua senha" 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
                        className="border border-gray-300 rounded-md p-2 m-2"
                    />
                    <input type="submit" value="Enviar" />
                </form>
            </div>
        </main>
    );
}

export default SignUpPlace;
