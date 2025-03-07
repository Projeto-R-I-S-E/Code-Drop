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
            window.location.href = '/';
        } else {
            alert("Erro ao registrar usuário.");
        }
    }

    return (
        <div className='bg-white h-screen w-full flex flex-col justify-center items-center'> 
            <main className="flex flex-col justify-center items-center bg-blue-600 p-6 rounded-lg shadow-lg w-full max-w-md">
                <p className='font-bold font-sans text-white text-center mb-4 text-4xl'>Sign up</p>

                <form 
                    onSubmit={handleSubmit} 
                    className="w-2/4 flex flex-col justify-center items-center gap-2"
                >
                    <input 
                        type="text" 
                        name="nome" 
                        id="nome" 
                        required 
                        placeholder="Digite seu nome" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        className="border border-gray-300 rounded-md p-2 h-6 w-96 m-2"

                    />
                    
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        required 
                        placeholder="Digite seu email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 h-6 w-96 m-2" 
                    />
                    <input 
                        type="password" 
                        name="senha" 
                        id="senha" 
                        required 
                        placeholder="Digite sua senha" 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
                        className="border border-gray-300 rounded-md p-2 h-6 w-96 m-2"
                    />
                    <input 
                        type="submit" 
                        value="Enviar" 
                        className="ttext-blue-800 p-2 m-2 bg-white border border-blue-800 rounded-md w-60"
                    />
                    <p className="text-white text-center text-lg font-sans w-80">
                        Já tem uma conta? {""}
                        <a href="https://drop-code.netlify.app/login" className=" text-white border border-white text-lg font-sans">Login aqui!</a>
                    </p>
    
                </form>
            </main>
        </div>
    );
}

export default SignUpPlace;
