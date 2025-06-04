import { useNavigate } from "react-router-dom";
import MainContainer from "../../../components/Layout/MainContainer/MainContainer"

const AdminGarages = () => {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <div className="">
        <h1 className="text-4xl font-bold">Administración de Talleres</h1>
        <p className="text-lg">Empresa: Jefferson Gutierritos & Company.</p>
      </div>
      <div className="mt-6 w-12xl">
        <button onClick={() => navigate('/administrar/talleres/nuevo')} className="bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800">
          Agregar Taller
        </button>
      </div>
    </MainContainer>
  );
}

export default AdminGarages;