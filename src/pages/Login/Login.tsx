import { Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [initialValues, setInitialValues] = useState({
    username: "",
    password: "",
  });

  return (
    <div className="flex items-center justify-center h-screen sm:bg-white md:bg-gray-200 lg:bg-gray-200">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
          // Aquí puedes manejar la lógica de inicio de sesión
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validate={(values) => {
          const errors: { username?: string; password?: string } = {};
          if (!values.username) {
            errors.username = "El nombre de usuario es requerido";
          }
          if (!values.password) {
            errors.password = "La contraseña es requerida";
          }
          return errors;
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <form className="bg-white flex flex-col items-center justify-center sm:w-full md:w-2xl lg:w-2xl md:shadow-md lg:shadow-lg rounded-2xl p-4 pt-9 pb-9" onSubmit={handleSubmit}>
            <h1 className="text-5xl font-bold mb-5 text-center">Iniciar Sesión</h1>
            <div className="flex flex-col items-center mb-5">
              <label className="text-xl font-semibold mb-2" htmlFor="username">Usuario:</label>
              <input
                type="text"
                id="username"
                name="username"
                className="border-2 border-gray-300 p-2 rounded-lg w-full sm:w-80 md:w-96 lg:w-96"
                value={values.username}
                onChange={handleChange}
              />
              {errors.username && <div className="text-red-700 mb-5">{errors.username}</div>}
            </div>
            <div className="flex flex-col items-center mb-5">
              <label className="text-xl font-semibold mb-2" htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="border-2 border-gray-300 p-2 rounded-lg w-full sm:w-80 md:w-96 lg:w-96"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <div className="text-red-700 mb-5">{errors.password}</div>}
            </div>
            <button className="bg-blue-600 font-bold w-xs text-white p-3 rounded-xl shadow-xs cursor-pointer" type="submit">Iniciar Sesión</button>
            <Link to={'/registrarse'} className="mt-2">
              <button className="bg-green-600 font-bold w-xs text-white p-3 rounded-xl shadow-xs cursor-pointer">Registrarse</button>
            </Link>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;