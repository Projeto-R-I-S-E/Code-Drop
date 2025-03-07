const Footer = () => {
  return (
    <footer className="flex-grow bg-blue-800 text-white py-6 mt-auto w-full h-[136px] flex items-center justify-between absolute bottom-0">
      <div className="container mx-auto flex flex-col items-center justify-center h-full text-center">
        <p className="text-lg">&copy; {new Date().getFullYear()} Code Drop. Todos os direitos reservados.</p>

      </div>
    </footer>
  );
};

export default Footer;