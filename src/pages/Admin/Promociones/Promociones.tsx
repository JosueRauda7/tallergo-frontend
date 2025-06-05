import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../../components/Layout/MainContainer/MainContainer";
import Table from "../../../components/Table/Table";
import Swal from "sweetalert2";

const Promociones = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<any>([{
    id: 1,
    taller: { nombre: 'Taller 1' },
    producto: { nombre: 'Producto 1' },
    fechaInicio: '2023-10-01',
    fechaFin: '2023-10-31',
    descripcion: 'Descripción de la promoción 1',
    estaEliminado: 'NO',
    estaActivo: 'SI'
  }, {
    id: 2,
    taller: { nombre: 'Taller 2' },
    producto: { nombre: 'Producto 2' },
    fechaInicio: '2023-11-01',
    fechaFin: '2023-11-30',
    descripcion: 'Descripción de la promoción 2',
    estaEliminado: 'NO',
    estaActivo: 'SI'
  }]);
  const [loading, setLoading] = useState(true);

  return (
    <MainContainer>
      <div className="">
        <h1 className="text-4xl font-bold">Administración de Promociones</h1>
      </div>
      <div className="mt-6 w-12xl">
        <button onClick={() => navigate('/administrar/promociones/nuevo')} className="bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800">
          Agregar Promoción
        </button>
        <div className="mt-4">
          <Table
            data={rows.filter(row => row.estaEliminado === 'NO' && row.estaActivo==='SI')}
            headers={['ID', 'Taller', 'Producto/Servicio', 'Inicio', 'Fin', 'Descripción', 'Acciones']} itemsPerPage={5}
            renderRow={(row: any) => (
              <>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.taller.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.producto.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(row.fechaInicio).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(row.fechaFin).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.descripcion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => navigate(`/administrar/promociones/${row.id}`)}
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
                            axios.delete(`${import.meta.env.VITE_API_URL}/promociones/${row.id}`)
                              .then(() => {
                                setRows(rows.filter((r: any) => r.id !== row.id));
                              })
                              .catch(err => console.error("Error deleting promociones:", err));
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

export default Promociones;