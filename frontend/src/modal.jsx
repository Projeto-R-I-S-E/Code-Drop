// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-bg-white  w-96">
          <button className="absolute top-2 right-2 text-white bg-blue-800" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;