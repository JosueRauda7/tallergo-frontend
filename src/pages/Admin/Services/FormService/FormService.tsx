import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainContainer from "../../../../components/Layout/MainContainer/MainContainer";
import { Formik } from "formik";

const FormService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any>([
    { id: 1, nombre: 'Categoría 1' },
    { id: 2, nombre: 'Categoría 2' },
    { id: 3, nombre: 'Categoría 3' },
  ]);

  const [initialValues, setInitialValues] = useState({
    subCategoryId: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
  });

  return (
    <MainContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="">
          <h1 className="text-4xl font-bold px-4 mb-4">{id ? 'Editar' : 'Nuevo'} Servicio</h1>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (values) => {
              console.log(values);
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.subCategoryId) {
                errors.subCategoryId = "La subcategoría es requerida";
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
                    <label className="block text-sm font-medium text-gray-700">Sub Categoría</label>
                    <select
                      name="subCategoryId"
                      value={values.subCategoryId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.subCategoryId && touched.subCategoryId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    >
                      <option value="">Seleccione una sub categoría</option>
                      {categories.map((category: any) => (
                        <option key={category.id} value={category.id}>{category.nombre}</option>
                      ))}
                    </select>
                    {errors.subCategoryId && touched.subCategoryId && <p className="text-red-500 text-sm">{errors.subCategoryId}</p>}
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
                        navigate('/administrar/sub-categorias');
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

export default FormService;