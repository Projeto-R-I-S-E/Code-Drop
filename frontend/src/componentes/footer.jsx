const Footer = () => {
    return (
      <footer className="bg-[rgba(2,56,89,0.9)] text-white py-6 mt-10 w-full absolute bottom-0 h-[136px]">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Code-Drop Todos os direitos reservados.</p>
          <nav className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Sobre</a>
            <a href="#" className="hover:underline">Contato</a>
            <a href="#" className="hover:underline">Política de Privacidade</a>
          </nav>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  