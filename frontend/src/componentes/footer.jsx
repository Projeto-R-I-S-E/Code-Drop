const Footer = () => {
    return (
      <footer className="bg-[rgba(2,56,89,0.9)] text-white py-6 mt-10 w-full absolute bottom-0 h-[136px] flex items-center justify-between ">
        <div className="container mx-auto flex flex-col items-center justify-center h-full text-center">
          <p className="text-lg">&copy; {new Date().getFullYear()} Code-Drop. Todos os direitos reservados.</p>

        </div>
      </footer>
    );
  };
  
  export default Footer;