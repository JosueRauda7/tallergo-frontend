import { useContext, useState } from "react";
import Button from "../../../components/Button/Button";
import MainContainer from "../../../components/Layout/MainContainer/MainContainer";
import { GeolocationContext } from "../../../context/GeolocationContext";
import SearchItem from "../../../components/SearchItem/SearchItem";

const Garage = () => {
  const {latitude, longitude} = useContext(GeolocationContext);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MainContainer>
      <h3 className="text-5xl font-bold text-center mb-4">
        Encontrar Talleres
      </h3>
      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Buscar"
          className="flex-10/12 p-2 border border-gray-300 rounded"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Button onClick={() => console.log(searchQuery)} className="flex-2/12 ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Buscar
        </Button>
      </div>
      <div className="mt-6 py-6 bg-gray-200">
        <h1 className="text-4xl font-bold text-center">Resultados de búsqueda</h1>
        <p className="text-md text-center mt-2">
          Aquí aparecerán los talleres cercanos a tu ubicación.
        </p>
        <div className="mt-4 px-4">
          <SearchItem title="Taller Jefferson Gutierritos"
            description="Taller especializado en mecánica general y electrónica automotriz."
            distance={1.2}
            businessName="Jefferson Gutierritos And Company"
            labels={["Mecánica", "Electrónica"]}
            isSalingProducts
            isService
            onClick={() => console.log("Taller seleccionado")}
          />
        </div>
      </div>
    </MainContainer>
  );
};

export default Garage;