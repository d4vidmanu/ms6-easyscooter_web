import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, DisclosureButton, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import AuthForm from "../components/AuthForm";


const navigation = [
  { name: 'Usuario', href: '/', current: false },
  { name: 'Técnico', href: '/tecnico', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavbarDefault() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // Estado para abrir o cerrar el modal

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <Disclosure as="nav" className="bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-claro hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-medio">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="EasyScooter"
                src="src/assets/logo.png"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  if (item.name === 'Técnico') {
                    return (
                      <Menu as="div" className="relative" key={item.name}>
                        <Menu.Button
                          className={classNames(
                            currentPath.startsWith('/tecnico')
                              ? 'bg-medio text-white'
                              : 'text-gray-800 hover:bg-claro hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                        >
                          {item.name}
                        </Menu.Button>
                        <Menu.Items className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/tecnico/nuevos-ingresos"
                                  className={classNames(
                                    active ? 'bg-claro text-white' : 'text-gray-800',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  Nuevos Ingresos
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/tecnico/scooters-en-reparacion"
                                  className={classNames(
                                    active ? 'bg-claro text-white' : 'text-gray-800',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  Scooters en Reparación
                                </Link>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Menu>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        currentPath === item.href
                          ? 'bg-medio text-white'
                          : 'text-gray-800 hover:bg-claro hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {/* Botón de Login */}
                <button
                  className="text-gray-800 hover:bg-claro hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal flotante de autenticación */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 relative w-full max-w-md">
            {/* Aquí se pasa la función de cierre al AuthForm */}
            <AuthForm onClose={() => setIsAuthModalOpen(false)} />
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setIsAuthModalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </Disclosure>
  );
}
