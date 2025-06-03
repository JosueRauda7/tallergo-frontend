const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-4 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} TallerGo. Todos los derechos reservados.
      </p>
    </div>
  );
};

export default Footer;