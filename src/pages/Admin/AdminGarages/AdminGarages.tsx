import {useNavigate} from "react-router-dom";
import MainContainer from "../../../components/Layout/MainContainer/MainContainer";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "../../../components/Table/Table";
import {useEffect, useState} from "react";

const AdminGarages = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/talleres`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setRows(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching garages:", error);
      }
    };

    fetchGarages();
  }, []);

  return (
    <MainContainer>
      <div className=''>
        <h1 className='text-4xl font-bold'>Administración de Talleres</h1>
        <p className='text-lg'>Empresa: Jefferson Gutierritos & Company.</p>
      </div>
      <div className='mt-6 w-12xl'>
        <button
          onClick={() => navigate("/administrar/talleres/nuevo")}
          className='bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800'>
          Agregar Taller
        </button>
      </div>
      <div className='mt-4'>
        <Table
          data={rows.filter(
            (row) => row.estaEliminado === "NO" && row.estaActivo === "SI",
          )}
          headers={[
            "ID",
            "Empresa",
            "Tipo",
            "Nombre",
            "Dirección",
            "Teléfono",
            "Email",
            "Acciones",
          ]}
          itemsPerPage={5}
          renderRow={(row: any) => (
            <>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {row.id}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {row.empresa.nombre}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {row.tipoTaller.nombre}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {row.nombre}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {row.direccion}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {row.telefono}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {row.email}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <button
                  onClick={() => navigate(`/administrar/talleres/${row.id}`)}
                  className='cursor-pointer bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'>
                  Editar
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "¿Desea eliminar el registro?",
                      confirmButtonText: "SI",
                      showCancelButton: true,
                      cancelButtonText: "NO",
                    }).then((res) => {
                      if (res.isConfirmed) {
                        axios
                          .delete(
                            `${import.meta.env.VITE_API_URL}/talleres/${row.id}`,
                          )
                          .then(() => {
                            setRows(rows.filter((r: any) => r.id !== row.id));
                          })
                          .catch((err) =>
                            console.error("Error deleting garage:", err),
                          );
                      }
                    });
                  }}
                  className='ml-2 cursor-pointer bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded'>
                  Eliminar
                </button>
              </td>
            </>
          )}
        />
      </div>
    </MainContainer>
  );
};

export default AdminGarages;
