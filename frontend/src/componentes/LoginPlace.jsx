import { useState } from 'react';
import { loginUser } from '../services/Api';

const LoginPlace = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        const response = await loginUser(email, senha);
        
        if (response && response.token) {
            localStorage.setItem('token', response.token);
            alert('Login realizado com sucesso!');
            window.location.href = '/'
        } else {
            setError('Email ou senha inválidos!');
        }
    };
    const isUserLoggedIn = () => {
        return !!localStorage.getItem("token"); // Se houver token, está logado
    };
    const logout = () => {
        if (localStorage.getItem("token")) { // Verifica se o usuário está logado
            localStorage.removeItem("token"); // Remove o token
            alert("Você saiu da conta!");
        }
    };

    return (
        <div className='border-solid w-2/4 h-96 flex flex-col justify-center items-center gap-5'>
            {isUserLoggedIn() ? <p>Usuário Logado</p> : 
            <>
                <p>Faça login</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                {error && <p className='text-red-500'>{error}</p>}
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        name="senha" 
                        id="senha" 
                        required 
                        placeholder='Digite sua senha'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <input 
                        type="submit" 
                        value="Enviar"
                    />
                </form>
            </>
            }
            <form action="https://drop-code.netlify.app/login">
                <input type="submit" onClick={logout} disabled={!localStorage.getItem("token")} value="Sair" />
            </form>
        </div>
    );
}

export default LoginPlace;