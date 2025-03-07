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

    return (
        <div className='bg-white h-screen w-full flex flex-col justify-center items-center'> 
            {isUserLoggedIn() ? <p>Usuário Logado</p> : 
            <>
            <main className="flex justify-center items-center flex-col gap-4 bg-blue-600 p-4 rounded-lg shadow-lg">
                <p className='text-2xl font-sans font-bold text-white text-center'>Faça login</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                {error && <p className='text-red-500'>{error}</p>}
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="Digite seu email"
                        className='border border-gray-300 rounded-md p-2 m-2'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        name="senha" 
                        id="senha" 
                        required 
                        placeholder='Digite sua senha'
                        className='border border-gray-300 rounded-md p-2 m-2'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <input 
                        type="submit" 
                        className='text-blue-800 p-2 m-2 bg-white border border-blue-800 rounded-md '
                        value="Enviar"
                    />
                    <input
                        type="button"
                        className= 'bg-blue-700 text-white rounded-md p-2 m-2 border border-white'
                        value="Voltar"
                        onClick={() => window.location.href = '/'} 
                    />
                </form>
                </main>
            </>
            }
        </div>
    );
}

export default LoginPlace;