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
        <div className='bg-white h-screen w-full flex flex-col mt-32 items-center'> 
            {isUserLoggedIn() ? <p>Usuário Logado</p> : 
            <>
            <main className="flex flex-col justify-center items-center bg-blue-600 p-6 rounded-lg shadow-lg w-full max-w-md">
                <p className=' font-bold font-sans text-white text-center mb-4 text-4xl'>Faça login</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                {error && <p className='text-red-500'>{error}</p>}
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="Digite seu email"
                        className='border border-gray-300 rounded-md p-2 m-2 h-6 w-96'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        name="senha" 
                        id="senha" 
                        required 
                        placeholder='Digite sua senha'
                        className='border border-gray-300 rounded-md p-2 m-2 h-6 w-96'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <input 
                        type="submit" 
                        className='text-blue-800 p-2 m-2 bg-white border border-blue-800 rounded-md w-80 self-center'
                        value="Logar"
                    />
                    <p className='text-white text-center text-lg font-sans'>
                        Não tem uma conta? 
                        <a href="https://drop-code.netlify.app/signup" className=" text-white border border-white text-lg font-sans">Cadastre-se aqui</a>
                    </p>
                </form>
                </main>
            </>
            }
        </div>
    );
}

export default LoginPlace;