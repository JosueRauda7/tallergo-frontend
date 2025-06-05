import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../../components/Layout/MainContainer/MainContainer";
import Table from "../../../components/Table/Table";
import Swal from "sweetalert2";

const Categories = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/categorias`);
        setRows(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <MainContainer>
      <div className="">
        <h1 className="text-4xl font-bold">Administración de Categorías</h1>
      </div>
      <div className="mt-6 w-12xl">
        <button onClick={() => navigate('/administrar/categorias/nuevo')} className="bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800">
          Agregar Categoría
        </button>
        <div className="mt-4">
          <Table
            data={rows.filter(row => row.estaEliminado === 'NO' && row.estaActivo==='SI')}
            headers={['ID', 'Nombre', 'Acciones']} itemsPerPage={5}
            renderRow={(row: any) => (
              <>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => navigate(`/administrar/tipos-talleres/${row.id}`)}
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
                            axios.delete(`${import.meta.env.VITE_API_URL}/tipo-talleres/${row.id}`)
                              .then(() => {
                                setRows(rows.filter((r: any) => r.id !== row.id));
                              })
                              .catch(err => console.error("Error deleting garage type:", err));
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

export default Categories;