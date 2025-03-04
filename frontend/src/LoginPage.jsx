//commit
import Header from './componentes/header'
function LoginPage(){
    return(
        <>
            <Header></Header>
            <form action="" className='border-solid w-2/4 h-96 flex flex-col justify-center place-items-center gap-5'>
                <input type="email" name="email" id="email" required placeholder="Digite seu email"/>
                <input type="password" name="senha" id="senha" required placeholder='Digite sua senha'/>
                <input type="submit" value="Enviar" />
            </form>
        </>
    )
}

export default LoginPage;