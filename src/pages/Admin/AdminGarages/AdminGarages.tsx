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
        <div className="overflow-x-auto mt-4">
          <table className="w-full mt-4">
            <thead className="sticky top-0 bg-gray-200">
              <tr>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 overflow-y-scroll max-h-96">
            </tbody>
          </table>
          <div className="flex justify-center mt-8">
            <nav className="inline-flex items-center space-x-1">
              <button className="px-3 py-1 rounded-l border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
                Anterior
              </button>

              <button className="px-3 py-1 border border-gray-300 bg-blue-500 text-white">1</button>
              <button className="px-3 py-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">2</button>
              <button className="px-3 py-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">3</button>
              <span className="px-3 py-1 text-gray-500">...</span>
              <button className="px-3 py-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">10</button>

              <button className="px-3 py-1 rounded-r border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
                Siguiente
              </button>
            </nav>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default AdminGarages;