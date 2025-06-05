import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainContainer from "../../../../components/Layout/MainContainer/MainContainer";
import { Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

const FormUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userTypes, setUserTypes] = useState<any>([
    { id: 1, nombre: 'ADMIN' },
    { id: 2, nombre: 'USER' }
  ]);

  const [initialValues, setInitialValues] = useState({
    tipoUsuarioId: '',
    usuario: '',
    password: '',
    nombres: '',
    apellidos: '',
  });

  return (
    <MainContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="">
          <h1 className="text-4xl font-bold px-4 mb-4">{id ? 'Editar' : 'Nuevo'} Usuario</h1>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (values) => {
              if(!id){
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/usuarios`, {
                  tipoUsuario: { id: values.tipoUsuarioId },
                  usuario: values.usuario,
                  password: values.password,
                  nombres: values.nombres,
                  apellidos: values.apellidos,
                });

                if (res.status === 201) {
                  toast.success("Usuario creado exitosamente", {
                    position: "bottom-right",
                  });
                  navigate('/administrar/usuarios');
                } else {
                  console.error("Error al crear el Usuario:", res.data);
                }
              }else{
                const res = await axios.put(`${import.meta.env.VITE_API_URL}/usuarios/${id}`, {
                  tipoUsuario: { id: values.tipoUsuarioId },
                  usuario: values.usuario,
                  password: values.password,
                  nombres: values.nombres,
                  apellidos: values.apellidos,
                });

                if (res.status === 200) {
                  toast.success("Usuario actualizado exitosamente", {
                    position: "bottom-right",
                  });
                  navigate('/administrar/usuarios');
                } else {
                  console.error("Error al actualizar el tipo de usuario:", res.data);
                }
              }
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.tipoUsuarioId) {
                errors.tipoUsuarioId = "El tipo de usuario es requerido";
              }
              if (!values.usuario) {
                errors.usuario = "El usuario es requerido";
              }
              if (!values.password) {
                errors.password = "La contraseña es requerida";
              }
              if (!values.nombres) {
                errors.nombres = "Los nombres son requeridos";
              }
              if (!values.apellidos) {
                errors.apellidos = "Los apellidos son requeridos";
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
                    <label className="block text-sm font-medium text-gray-700">Tipo de Usuario</label>
                    <select
                      name="tipoUsuarioId"
                      value={values.tipoUsuarioId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.tipoUsuarioId && touched.tipoUsuarioId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    >
                      <option value="">Seleccione un tipo de usuario</option>
                      {userTypes.map((type: any) => (
                        <option key={type.id} value={type.id}>{type.nombre}</option>
                      ))}
                    </select>
                    {errors.tipoUsuarioId && touched.tipoUsuarioId && <p className="text-red-500 text-sm">{errors.tipoUsuarioId}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Usuario</label>
                    <input
                      type="text"
                      name="usuario"
                      value={values.usuario}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.usuario && touched.usuario ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.usuario && touched.usuario && <p className="text-red-500 text-sm">{errors.usuario}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.password && touched.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombres</label>
                    <input
                      type="text"
                      name="nombres"
                      value={values.nombres}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.nombres && touched.nombres ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.nombres && touched.nombres && <p className="text-red-500 text-sm">{errors.nombres}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Apellidos</label>
                    <input
                      type="text"
                      name="apellidos"
                      value={values.apellidos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`py-2 px-2 mt-1 block w-full border ${errors.apellidos && touched.apellidos ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.apellidos && touched.apellidos && <p className="text-red-500 text-sm">{errors.apellidos}</p>}
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
                        navigate('/administrar/usuarios');
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

export default FormUsers;