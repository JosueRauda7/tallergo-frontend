import WomanInGarage1 from '../../assets/womanInGarage.jpg';
import WomanInGarage2 from '../../assets/womanInGarage2.jpg';
import MainContainer from '../../components/Layout/MainContainer/MainContainer';

const ContactUs = () => {
  return (
    <MainContainer>
      <div className="sm:px-10 md:px-24 lg:px-72">
        <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold py-6 text-center">Contáctanos</h1>
        <p className='text-xl'><b>TallerGO</b> es una plataforma diseñada para conectar a conductores con talleres mecánicos confiables de manera rápida, segura y transparente. Nuestro objetivo es modernizar la forma en que las personas encuentran servicios de mantenimiento automotriz, ofreciendo reseñas reales, disponibilidad en tiempo real y una experiencia digital intuitiva.</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 my-6 justify-center align-center'>
          <img src={WomanInGarage1} alt="Mujer en taller mecánico" className="h-auto my-6 rounded-lg shadow-lg" />
          <div className='flex flex-col justify-center items-center'>
            <p className='text-xl'>Sabemos que muchos talleres ofrecen un excelente servicio, pero no siempre cuentan con las herramientas digitales para destacar en línea. Por eso, creamos TallerGO.</p>
          </div>
        </div>
        <h1 className="text-4xl font-bold py-6 text-center">¿Tienes un taller mecánico?</h1>
        <p className='text-xl'>¡Esta es tu oportunidad para llegar a más clientes! En TallerGO, ayudamos a talleres como el tuyo a tener visibilidad en internet, facilitar sus reservas y ganarse la confianza de nuevos clientes.</p>
        <br />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 my-6 justify-center align-center'>
          <img src={WomanInGarage2} alt="Mujer en taller mecánico" className="h-auto my-6 rounded-lg shadow-lg" />
          <div className='flex flex-col justify-center items-center'>
            <p className='text-xl'>Si estás interesado en unirte a nuestra plataforma, contáctanos a través de los siguientes medios:</p>
            <br />
            <ul className="list-disc pl-6 text-xl">
              <li>Email: 
                <a href="mailto:registros@tallergo.com" className="text-blue-600 hover:underline">
                  registros@tallergo.com
                </a>
              </li>
              <li>Teléfono: 
                <a href="tel:+50312345678" className="text-blue-600 hover:underline">
                  +503 1234-5678
                </a>
              </li>
              <li>WhatsApp: 
                <a href="https://wa.me/50312345678" className="text-blue-600 hover:underline">
                  +503 1234-5678
                </a>
              </li>
              <li>Visítanos en nuestras redes sociales: 
                <a href="https://www.facebook.com/TallerGO" className="text-blue-600 hover:underline">
                  Facebook
                </a>, 
                <a href="https://www.instagram.com/TallerGO" className="text-blue-600 hover:underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default ContactUs;