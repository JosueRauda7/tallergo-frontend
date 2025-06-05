import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainContainer from "../../../../components/Layout/MainContainer/MainContainer";
import { Formik } from "formik";

const FormProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any>([
    { id: '1', nombre: 'Subcategoría 1' },
    { id: '2', nombre: 'Subcategoría 2' },
    { id: '3', nombre: 'Subcategoría 3' },
  ]);

  const [initialValues, setInitialValues] = useState({
    subCategoryId: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
  });

  return (
    <MainContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="">
          <h1 className="text-4xl font-bold px-4 mb-4">{id ? 'Editar' : 'Nuevo'} Producto</h1>
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
              if (!values.descripcion) {
                errors.descripcion = "La descripción es requerida";
              }
              if (!values.precio) {
                errors.precio = "El precio es requerido";
              } else if (isNaN(values.precio)) {
                errors.precio = "El precio debe ser un número";
              }
              if (!values.stock) {
                errors.stock = "El stock es requerido";
              } else if (isNaN(values.stock)) {
                errors.stock = "El stock debe ser un número";
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Precio</label>
                    <input
                      type="number"
                      name="precio"
                      value={values.precio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.precio && touched.precio ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.precio && touched.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={values.stock}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.stock && touched.stock ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.stock && touched.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
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
                        navigate('/administrar/productos');
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

export default FormProduct;