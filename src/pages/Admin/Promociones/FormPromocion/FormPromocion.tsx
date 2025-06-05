import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainContainer from "../../../../components/Layout/MainContainer/MainContainer";
import { Formik } from "formik";

const FormPromocion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [talleres, setTalleres] = useState<any>([
    { id: '1', nombre: 'Taller 1' },
  ]);
  const [productosServicios, setProductosServicios] = useState<any>([
    { id: '1', nombre: 'Producto/Servicio 1' },
    { id: '2', nombre: 'Producto/Servicio 2' },
  ]);

  const [initialValues, setInitialValues] = useState({
    tallerId: '',
    productoServicioId: '',
    fechaInicio: '',
    fechaFin: '',
    descripcion: '',
  });

  return (
    <MainContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="">
          <h1 className="text-4xl font-bold px-4 mb-4">{id ? 'Editar' : 'Nuevo'} Promoción</h1>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (values) => {
              console.log(values);
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.tallerId) {
                errors.tallerId = "El taller es requerido";
              }
              if (!values.productoServicioId) {
                errors.productoServicioId = "El producto/servicio es requerido";
              }
              if (!values.fechaInicio) {
                errors.fechaInicio = "La fecha de inicio es requerida";
              }
              if (!values.fechaFin) {
                errors.fechaFin = "La fecha de fin es requerida";
              }
              if (!values.descripcion) {
                errors.descripcion = "La descripción es requerida";
              }
              return errors;
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <>
                <form onSubmit={handleSubmit} className="space-y-4 px-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Taller</label>
                    <select
                      name="tallerId"
                      value={values.tallerId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.tallerId && touched.tallerId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    >
                      <option value="">Seleccione un taller</option>
                      {talleres.map((taller: any) => (
                        <option key={taller.id} value={taller.id}>{taller.nombre}</option>
                      ))}
                    </select>
                    {errors.tallerId && touched.tallerId && <p className="text-red-500 text-sm">{errors.tallerId}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Producto/Servicio</label>
                    <select
                      name="productoServicioId"
                      value={values.productoServicioId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.productoServicioId && touched.productoServicioId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    >
                      <option value="">Seleccione un producto/servicio</option>
                      {productosServicios.map((item: any) => (
                        <option key={item.id} value={item.id}>{item.nombre}</option>
                      ))}
                    </select>
                    {errors.productoServicioId && touched.productoServicioId && <p className="text-red-500 text-sm">{errors.productoServicioId}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                    <input
                      type="date"
                      name="fechaInicio"
                      value={values.fechaInicio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.fechaInicio && touched.fechaInicio ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.fechaInicio && touched.fechaInicio && <p className="text-red-500 text-sm">{errors.fechaInicio}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
                    <input
                      type="date"
                      name="fechaFin"
                      value={values.fechaFin}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.fechaFin && touched.fechaFin ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.fechaFin && touched.fechaFin && <p className="text-red-500 text-sm">{errors.fechaFin}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <input
                      type="text"
                      name="descripcion"
                      value={values.descripcion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.descripcion && touched.descripcion ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.descripcion && touched.descripcion && <p className="text-red-500 text-sm">{errors.descripcion}</p>}
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      className="bg-blue-700 text-white mr-2 px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/administrar/promociones');
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-400  cursor-pointer"
                    >Cancelar</button>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </MainContainer>
  );
};

export default FormPromocion;