import {useContext} from "react";
import {Link} from "react-router-dom";
import {LoginContext} from "../../context/LoginContext";

const Admin = () => {
  const {user, userType} = useContext(LoginContext);

  return (
    <div>
      <div className='p-6'>
        <h1 className='text-4xl font-bold'>DASHBOARD</h1>
        <p className='text-lg mt-2'>Bienvenido al panel de administración.</p>
      </div>
      <div className='p-6 bg-gray-300'>
        <h2 className='text-2xl font-semibold'>Gestión de Talleres 🧰</h2>
        <p className='t-2'>Aquí puedes administrar los talleres y sus tipos.</p>
        <div className='flex space-x-4 mt-4 w-full flex-wrap'>
          {userType === "Administrador" && (
            <>
              <Link to='/administrar/empresas'>
                <button className='bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800'>
                  Administrar Empresas
                </button>
              </Link>
              <Link to='/administrar/tipos-talleres'>
                <button className='bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800'>
                  Administrar Tipos Talleres
                </button>
              </Link>
            </>
          )}
          <Link to='/administrar/talleres'>
            <button className='bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800'>
              Administrar Talleres
            </button>
          </Link>
        </div>
      </div>
      {userType === "Administrador" && (
        <>
          <div className='p-6 bg-white'>
            <div className=''>
              <h2 className='text-2xl font-semibold'>Gestión de Usuarios 🧑‍💻</h2>
              <p className='t-2'>
                Aquí puedes administrar los usuarios registrados en la
                aplicación.
              </p>
              <div className='flex space-x-4 mt-4 w-full flex-wrap'>
                <Link to='/administrar/tipo-usuarios'>
                  <button className='bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800'>
                    Administrar Tipos de Usuarios
                  </button>
                </Link>
                <Link to='/administrar/usuarios'>
                  <button className='bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800'>
                    Administrar Usuarios
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className='p-6 bg-gray-300'>
            <div className=''>
              <h2 className='text-2xl font-semibold'>
                Gestión de Categorías 📱
              </h2>
              <p className='t-2'>
                Aquí puedes administrar las categorías de los talleres.
              </p>
              <div className='flex space-x-4 mt-4 w-full flex-wrap'>
                <Link to='/administrar/categorias'>
                  <button className='bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800'>
                    Administrar Categorías
                  </button>
                </Link>
                <Link to='/administrar/sub-categorias'>
                  <button className='bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800'>
                    Administrar Sub Categorías
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      {(userType === "Administrador" || userType === "Gestor de Taller") && (
        <>
          <div className='p-6 bg-white'>
            <div className=''>
              <h2 className='text-2xl font-semibold'>
                Gestión de Servicios y/o Productos 🧑‍💻
              </h2>
              <p className='t-2'>
                Aquí puedes administrar los servicios y productos ofrecidos.
              </p>
              <div className='flex space-x-4 mt-4 w-full flex-wrap'>
                <Link to='/administrar/servicios'>
                  <button className='bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800'>
                    Administrar Servicios
                  </button>
                </Link>
                <Link to='/administrar/productos'>
                  <button className='bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800'>
                    Administrar Productos
                  </button>
                </Link>
                {/* <Link to='/administrar/promociones'>
                  <button className='bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800'>
                    Administrar Promociones
                  </button>
                </Link> */}
              </div>
            </div>
          </div>
          <div className='p-6 bg-gray-300'>
            <div className=''>
              <h2 className='text-2xl font-semibold'>
                Gestión de Etiquetas 📱
              </h2>
              <p className='t-2'>
                Aquí puedes administrar las etiquetas de los talleres.
              </p>
              <div className='flex space-x-4 mt-4 w-full flex-wrap'>
                <Link to='/administrar/etiquetas'>
                  <button className='bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-800'>
                    Administrar Etiquetas
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
