import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../../components/Layout/MainContainer/MainContainer";
import Table from "../../../components/Table/Table";
import Swal from "sweetalert2";

const Services = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<any>([{
    id: 1,
    subCategoria: { nombre: 'Sub Categoría 1' },
    nombre: 'Servicio 1',
    precio: 100.00,
    stock: 10,
    estaEliminado: 'NO',
    estaActivo: 'SI'
  }, {
    id: 2,
    subCategoria: { nombre: 'Sub Categoría 2' },
    nombre: 'Servicio 2',
    precio: 200.00,
    stock: 5,
    estaEliminado: 'NO',
    estaActivo: 'SI'
  }]);
  const [loading, setLoading] = useState(true);

  return (
    <MainContainer>
      <div className="">
        <h1 className="text-4xl font-bold">Administración de Servicios</h1>
      </div>
      <div className="mt-6 w-12xl">
        <button onClick={() => navigate('/administrar/servicios/nuevo')} className="bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800">
          Agregar Servicio
        </button>
        <div className="mt-4">
          <Table
            data={rows.filter(row => row.estaEliminado === 'NO' && row.estaActivo==='SI')}
            headers={['ID', 'Sub Categoría', 'Nombre', 'Precio', 'Stock', 'Acciones']} itemsPerPage={5}
            renderRow={(row: any) => (
              <>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.subCategoria.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $ {row.precio.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => navigate(`/administrar/servicios/${row.id}`)}
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
                            axios.delete(`${import.meta.env.VITE_API_URL}/servicios/${row.id}`)
                              .then(() => {
                                setRows(rows.filter((r: any) => r.id !== row.id));
                              })
                              .catch(err => console.error("Error deleting servicios:", err));
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

export default Services;