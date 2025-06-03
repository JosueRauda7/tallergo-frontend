import Logo from '../../assets/TallerGOLogo.png';
import MovilWithMaps from '../../assets/movilMaps.jpg';
import ManInCar from '../../assets/manInCar.jpg';
import CalityImage from '../../assets/calityApp.jpg';
import MechanicImage1 from '../../assets/mechanic1.jpg';
import MechanicImage2 from '../../assets/mechanic2.jpg';
import MainContainer from '../../components/Layout/MainContainer/MainContainer';

const AboutUs = () => {
  return (
    <MainContainer>
      <div className="about-us md:px-24 lg:px-72">
        <img src={Logo} alt="TallerGO Logo" className="h-auto mx-auto my-6 " />
        <h1 className="text-4xl font-bold py-6">¿Quiénes Somos?</h1>
        <p className='text-xl'>En TallerGO, somos una plataforma innovadora que conecta a conductores con talleres mecánicos confiables en su ciudad. Nacimos con la misión de hacer más fácil, rápido y seguro el proceso de encontrar y reservar servicios automotrices de calidad, todo desde la comodidad de tu celular.</p>
        <img src={MovilWithMaps} alt="TallerGO App" className="w-full h-auto my-6 rounded-lg shadow-lg" />
        <h1 className="text-4xl font-bold py-6">Nuestra Misión</h1>
        <p className='text-xl'>Queremos transformar la manera en que las personas cuidan de sus vehículos. Facilitamos el acceso a reseñas reales, disponibilidad en tiempo real y una experiencia digital pensada para quienes valoran su tiempo y su tranquilidad al volante.</p>
        <img src={ManInCar} alt="Conductor feliz" className="w-full h-auto my-6 rounded-lg shadow-lg" />
        <h1 className="text-4xl font-bold py-6">Lo Que Nos Hace Diferentes</h1>
        <p className='text-xl'>Nos enfocamos en la confianza y la transparencia. Cada taller en nuestra plataforma es evaluado por la comunidad y cumple con estándares de calidad verificados. Además, nuestro sistema de reservas permite agendar citas sin llamadas ni complicaciones.</p>
        <img src={CalityImage} alt="Calidad TallerGO" className="w-full h-auto my-6 rounded-lg shadow-lg" />
        <h1 className="text-4xl font-bold py-6">Nuestro Compromiso</h1>
        <p className='text-xl'>En TallerGO, trabajamos constantemente para mejorar la experiencia de nuestros usuarios y ayudar a los talleres a crecer en el mundo digital. Estamos comprometidos con la innovación, el servicio al cliente y la mejora continua.</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 my-6'>
          <img src={MechanicImage1} alt="Mecánico trabajando" className="w-full h-auto rounded-lg shadow-lg" />
          <img src={MechanicImage2} alt="Mecánico trabajando" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </div>
    </MainContainer>
  );
};

export default AboutUs;