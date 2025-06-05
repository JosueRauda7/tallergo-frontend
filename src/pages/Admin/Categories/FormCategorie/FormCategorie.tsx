import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainContainer from "../../../../components/Layout/MainContainer/MainContainer";
import { Formik } from "formik";

const FormCategorie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [garages, setGarages] = useState<any>([
    { id: 1, nombre: 'Jefferson Gutierritos' }
  ]);

  const [initialValues, setInitialValues] = useState({
    tallerId: '',
    nombre: '',
  });

  return (
    <MainContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="">
          <h1 className="text-4xl font-bold px-4 mb-4">{id ? 'Editar' : 'Nueva'} Categoría</h1>
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
              if (!values.nombre) {
                errors.nombre = "El nombre es requerido";
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
                      {garages.map((garage: any) => (
                        <option key={garage.id} value={garage.id}>{garage.nombre}</option>
                      ))}
                    </select>
                    {errors.tallerId && touched.tallerId && <p className="text-red-500 text-sm">{errors.tallerId}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={values.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.nombre && touched.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.nombre && touched.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
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
                        navigate('/administrar/categorias');
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

export default FormCategorie;