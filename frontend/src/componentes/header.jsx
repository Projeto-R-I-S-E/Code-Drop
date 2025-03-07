import {useState} from "react"; 

const Header = () => {
    const [token] = useState(localStorage.getItem("token") || "");

    const logout = () => {
        if (localStorage.getItem("token")) { // Verifica se o usuário está logado
            localStorage.removeItem("token"); // Remove o token
            alert("Você saiu da conta!");
        }
    };
    return(
        <header className="w-full h-28 bg-blue-800 flex justify-around place-items-center">
            <div className="flex gap-6 place-items-center">
                <a href="https://drop-code.netlify.app">
                <svg className="w-16 h-fit fill-TerminalSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6zM256 416l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
                </a>
                <h1 className="text-white h-fit m-0 font-mono">Code Drop</h1>
            </div>
            <div className="flex gap-4">
                {token ? 
                <>
                    <form action="https://drop-code.netlify.app">
                        <input type="submit" onClick={logout} value="Sair" className="bg-blue-800 text-white border-2 border-white px-6 py-2 rounded-md cursor-pointer" />
                    </form>
                </>
                :
                <>
                    <form action="https://drop-code.netlify.app/login">
                        <input type="submit" value="LOGIN" className="bg-blue-800 text-white border-2 border-white px-6 py-2 rounded-md cursor-pointer"/>
                    </form>
                    <form action="https://drop-code.netlify.app/signup">
                        <input type="submit" value="SIGN UP" disabled={localStorage.getItem("token")} className="bg-white text-blue-800 border-2 border-white px-4 py-2 rounded-md cursor-pointer"/>
                    </form>
                </>
                }
            </div>
        </header>
    )
}

export default Header;