import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainContainer from "../../../../components/Layout/MainContainer/MainContainer";
import { Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

const FormUserTypes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: "",
  });

  return (
    <MainContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="">
          <h1 className="text-4xl font-bold px-4 mb-4">{id ? 'Editar' : 'Nuevo'} Tipo de Usuario</h1>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (values) => {
              if(!id){
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/tipos-usuarios`, {
                  nombre: values.name,
                });

                if (res.status === 201) {
                  toast.success("Tipo de usuario creado exitosamente", {
                    position: "bottom-right",
                  });
                  navigate('/administrar/tipos-usuarios');
                } else {
                  console.error("Error al crear el tipo de usuario:", res.data);
                }
              }else{
                const res = await axios.put(`${import.meta.env.VITE_API_URL}/tipos-usuarios/${id}`, {
                  nombre: values.name,
                });

                if (res.status === 200) {
                  toast.success("Tipo de usuario actualizado exitosamente", {
                    position: "bottom-right",
                  });
                  navigate('/administrar/tipos-usuarios');
                } else {
                  console.error("Error al actualizar el tipo de usuario:", res.data);
                }
              }
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.name) {
                errors.name = "El nombre es requerido";
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
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.name && touched.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
                        navigate('/administrar/tipo-usuarios');
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

export default FormUserTypes;