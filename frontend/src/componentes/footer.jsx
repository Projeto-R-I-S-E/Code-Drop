const Footer = () => {
    return (
      <footer className="bg-[rgba(2,56,89,0.9)] text-white py-6 mt-10 w-full absolute bottom-0 h-[136px] flex items-center justify-between ">
        <div className="container mx-auto flex flex-col items-center justify-center h-full text-center">
          <p className="text-lg">&copy; {new Date().getFullYear()} Seu Site. Todos os direitos reservados.</p>
          <nav className="flex space-x-6 mt-4">
            <a href="#" className="text-white no-underline hover:opacity-80">Sobre</a>
            <a href="#" className="text-white no-underline hover:opacity-80">Contato</a>
            <a href="#" className="text-white no-underline hover:opacity-80">Política de Privacidade</a>
          </nav>
        </div>
      </footer>
    );
  };
  
  export default Footer;