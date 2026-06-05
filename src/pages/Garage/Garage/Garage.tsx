import {useContext, useState} from "react";
import Button from "../../../components/Button/Button";
import MainContainer from "../../../components/Layout/MainContainer/MainContainer";
import {GeolocationContext} from "../../../context/GeolocationContext";
import SearchItem from "../../../components/SearchItem/SearchItem";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import type {SearchResponse} from "../../../interfaces/http/search.interface";

const Garage = () => {
  const navigate = useNavigate();
  const {latitude, longitude} = useContext(GeolocationContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [talleres, setTalleres] = useState([]);

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    const searchRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/talleres?query=${searchQuery || ""}&distancia=10&latitud=${latitude}&longitud=${longitude}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setTalleres(searchRes.data);
  };

  return (
    <MainContainer>
      <h3 className='text-5xl font-bold text-center mb-4'>
        Encontrar Talleres
      </h3>
      <div className='flex mt-4'>
        <input
          type='text'
          placeholder='Buscar'
          className='flex-10/12 p-2 border border-gray-300 rounded'
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Button
          onClick={handleSearch}
          className='flex-2/12 ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
          Buscar
        </Button>
      </div>
      <div className='mt-6 py-6 bg-gray-200'>
        <h1 className='text-4xl font-bold text-center'>
          Resultados de búsqueda
        </h1>
        <p className='text-md text-center mt-2'>
          Aquí aparecerán los talleres cercanos a tu ubicación.
        </p>
        <div className='mt-4 px-4'>
          {talleres.map((taller: SearchResponse) => (
            <SearchItem
              key={taller.id}
              title={taller.nombre}
              description={taller.nombre}
              distance={taller.distancia}
              businessName={taller.empresa.nombre}
              labels={[]}
              isSalingProducts
              isService
              onClick={() => navigate(`/talleres/${taller.id}`)}
            />
          ))}
        </div>
      </div>
    </MainContainer>
  );
};

export default Garage;
