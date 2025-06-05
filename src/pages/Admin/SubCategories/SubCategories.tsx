import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../../components/Layout/MainContainer/MainContainer";
import Table from "../../../components/Table/Table";
import Swal from "sweetalert2";

const SubCategories = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/sub-categorias`);
        setRows(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sub-categories:", error);
      }
    };

    fetchSubCategories();
  }, []);

  return (
    <MainContainer>
      <div className="">
        <h1 className="text-4xl font-bold">Administración de Sub Categorías</h1>
      </div>
      <div className="mt-6 w-12xl">
        <button onClick={() => navigate('/administrar/sub-categorias/nuevo')} className="bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800">
          Agregar Sub Categoría
        </button>
        <div className="mt-4">
          <Table
            data={rows.filter(row => row.estaEliminado === 'NO' && row.estaActivo==='SI')}
            headers={['ID', 'Categoría', 'Nombre', 'Acciones']} itemsPerPage={5}
            renderRow={(row: any) => (
              <>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.categoria.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => navigate(`/administrar/sub-categorias/${row.id}`)}
                    className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "¿Desea eliminar el registro?",
                        confirmButtonText: "SI",
                        showCancelButton: true,
                        cancelButtonText: "NO",
                      })
                        .then(res => {
                          if(res.isConfirmed){
                            axios.delete(`${import.meta.env.VITE_API_URL}/sub-categorias/${row.id}`)
                              .then(() => {
                                setRows(rows.filter((r: any) => r.id !== row.id));
                              })
                              .catch(err => console.error("Error deleting categorie:", err));
                          }
                      });
                    }}
                    className="ml-2 cursor-pointer bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </>
            )}
          />
        </div>
      </div>
    </MainContainer>
  );
};

export default SubCategories;