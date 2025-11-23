import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../api/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser.data);
      setUserType(currentUser.type);
    }
    setLoading(false);
  }, []);

  /**
   * Login de usuario
   */
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.data);
      setUserType(response.type);
      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Registro de usuario persona
   */
  const registerUser = async (userData) => {
    try {
      const response = await authService.registerUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Registro de negocio
   */
  const registerBusiness = async (businessData) => {
    try {
      const response = await authService.registerBusiness(businessData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Cerrar sesión
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    setUserType(null);
  };

  /**
   * Verificar si está autenticado
   */
  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  const value = {
    user,
    userType,
    loading,
    login,
    logout,
    registerUser,
    registerBusiness,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook personalizado para usar el contexto de autenticación
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;
