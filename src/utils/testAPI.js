/**
 * Script de prueba para verificar la conexión con la API
 * Puedes ejecutar estas funciones desde la consola del navegador
 */

import authService from '../api/authService';

// Test de conexión básica
export const testPing = async () => {
  try {
    console.log('🔍 Probando conexión con API...');
    const response = await authService.testConnection();
    console.log('✅ Conexión exitosa:', response);
    return response;
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    return null;
  }
};

// Test de login
export const testLogin = async (email = 'test@example.com', password = 'password123') => {
  try {
    console.log('🔍 Probando login...');
    const response = await authService.login(email, password);
    console.log('✅ Login exitoso:', response);
    return response;
  } catch (error) {
    console.error('❌ Error en login:', error.response?.data || error.message);
    return null;
  }
};

// Test de registro de usuario
export const testRegisterUser = async () => {
  const testData = {
    nombre: 'Usuario Test',
    apellidos: 'Apellido Test',
    correo: `test${Date.now()}@example.com`,
    password: 'password123',
    ciudad: 'San Salvador',
  };

  try {
    console.log('🔍 Probando registro de usuario...');
    console.log('Datos:', testData);
    const response = await authService.registerUser(testData);
    console.log('✅ Registro exitoso:', response);
    return response;
  } catch (error) {
    console.error('❌ Error en registro:', error.response?.data || error.message);
    return null;
  }
};

// Test de registro de negocio
export const testRegisterBusiness = async () => {
  const testData = {
    nombreNegocio: 'Negocio Test',
    email: `negocio${Date.now()}@example.com`,
    password: 'password123',
    descripcionCorta: 'Un negocio de prueba',
    direccionEscrita: 'Calle Test #123',
    telefonoWhatsApp: '7000-0000',
    oferta: ['Productos'],
    metodosPago: ['Efectivo', 'Transferencia'],
    contactoEmail: `contacto${Date.now()}@example.com`,
  };

  try {
    console.log('🔍 Probando registro de negocio...');
    console.log('Datos:', testData);
    const response = await authService.registerBusiness(testData);
    console.log('✅ Registro exitoso:', response);
    return response;
  } catch (error) {
    console.error('❌ Error en registro:', error.response?.data || error.message);
    return null;
  }
};

// Ejecutar todos los tests
export const runAllTests = async () => {
  console.log('🚀 Iniciando pruebas de API...\n');
  
  await testPing();
  console.log('\n---\n');
  
  // Nota: Los siguientes tests crearán registros en la base de datos
  // Descomenta solo si quieres probarlos
  
  // await testRegisterUser();
  // console.log('\n---\n');
  
  // await testRegisterBusiness();
  // console.log('\n---\n');
  
  // await testLogin('test@example.com', 'password123');
  
  console.log('\n✅ Pruebas completadas');
};

// Exportar para uso en consola del navegador
if (typeof window !== 'undefined') {
  window.testAPI = {
    ping: testPing,
    login: testLogin,
    registerUser: testRegisterUser,
    registerBusiness: testRegisterBusiness,
    runAll: runAllTests,
  };
  
  console.log('💡 Tests de API disponibles en window.testAPI');
  console.log('Ejemplo: window.testAPI.ping()');
}

export default {
  testPing,
  testLogin,
  testRegisterUser,
  testRegisterBusiness,
  runAllTests,
};
