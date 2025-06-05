import { Formik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

const Register = () => {
  const {login} = useContext(LoginContext);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    username: "",
    names: "",
    lastNames: "",
    password: "",
    repeatPassword: "",
  });

  return (
    <div className="flex items-center min-h-full justify-center overflow-y-scroll md:py-4 sm:bg-white md:bg-gray-200 lg:bg-gray-200">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
          // Aquí puedes manejar la lógica de inicio de sesión
          login();
          navigate('/');
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validate={(values) => {
          const errors: {
            username?: string; password?: string; repeatPassword?: string;
            names?: string; lastNames?: string;
          } = {};
          if (!values.username) {
            errors.username = "El nombre de usuario es requerido";
          }
          if (!values.names) {
            errors.names = "El nombre es requerido";
          }
          if (!values.lastNames) {
            errors.lastNames = "Los apellidos son requeridos";
          }
          if (!values.password) {
            errors.password = "La contraseña es requerida";
          }
          if (values.password !== values.repeatPassword) {
            errors.repeatPassword = "Las contraseñas no coinciden";
          }
          return errors;
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <form className="bg-white flex flex-col items-center justify-center sm:w-full md:w-2xl lg:w-2xl md:shadow-md lg:shadow-lg rounded-2xl md:p-4 pt-9 pb-9" onSubmit={handleSubmit}>
            <h1 className="text-5xl font-bold mb-5 text-center">Registrarse</h1>
            <div className="flex flex-col items-center mb-2">
              <label className="text-xl font-semibold mb-2" htmlFor="username">Usuario:</label>
              <input
                type="text"
                id="username"
                name="username"
                className="border-2 border-gray-300 p-2 rounded-lg w-full sm:w-80 md:w-96 lg:w-96"
                value={values.username}
                onChange={handleChange}
              />
              {errors.username && <div className="text-red-700 mb-2">{errors.username}</div>}
            </div>
            <div className="flex flex-col items-center mb-2">
              <label className="text-xl font-semibold mb-2" htmlFor="names">Nombre:</label>
              <input
                type="text"
                id="names"
                name="names"
                className="border-2 border-gray-300 p-2 rounded-lg w-full sm:w-80 md:w-96 lg:w-96"
                value={values.names}
                onChange={handleChange}
              />
              {errors.names && <div className="text-red-700 mb-2">{errors.names}</div>}
            </div>
            <div className="flex flex-col items-center mb-2">
              <label className="text-xl font-semibold mb-2" htmlFor="lastNames">Apellidos:</label>
              <input
                type="text"
                id="lastNames"
                name="lastNames"
                className="border-2 border-gray-300 p-2 rounded-lg w-full sm:w-80 md:w-96 lg:w-96"
                value={values.lastNames}
                onChange={handleChange}
              />
              {errors.lastNames && <div className="text-red-700 mb-2">{errors.lastNames}</div>}
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
              {errors.password && <div className="text-red-700 mb-2">{errors.password}</div>}
            </div>
            <div className="flex flex-col items-center mb-5">
              <label className="text-xl font-semibold mb-2" htmlFor="repeatPassword">Repetir Contraseña:</label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                className="border-2 border-gray-300 p-2 rounded-lg w-full sm:w-80 md:w-96 lg:w-96"
                value={values.repeatPassword}
                onChange={handleChange}
              />
              {errors.repeatPassword && <div className="text-red-700 mb-2">{errors.repeatPassword}</div>}
            </div>
            <button className="bg-blue-600 font-bold w-xs text-white p-3 rounded-xl shadow-xs cursor-pointer" type="submit">Registrarse</button>
            <Link to={'/'} className="mt-2">
              <button className="bg-green-600 font-bold w-xs text-white p-3 rounded-xl shadow-xs cursor-pointer">Ya tengo cuenta. Iniciar Sesión.</button>
            </Link>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;