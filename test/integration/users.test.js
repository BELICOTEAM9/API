const app = require('../../app');
const supertest = require('supertest');
const { v4: uuidv4 } = require('uuid');


const request = supertest(app);

describe('Pruebas de integración del servidor Express', () => {
  // Prueba para obtener todos los usuarios
  test('Obtener todos los usuarios', async () => {
    const response = await request.get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    console.log('GET /users - Estado:', response.statusCode);
  });

  // Prueba para obtener el detalle de un usuario por ID
  test('Obtener detalle de un usuario por ID', async () => {
    const userId = 5;
    const response = await request.get(`/users/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(userId);
    console.log(`GET /users/${userId} - Estado:`, response.statusCode);
  });

  test('Crear un nuevo usuario', async () => {
    const newUser = { name: 'Jhon', email: 'jhon@example.com' };
    const response = await request.post('/users').send(newUser);
    if (response.statusCode === 201) {
      // El usuario se creó correctamente
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      console.log('POST /users - Estado:', response.statusCode);
    } else if (response.statusCode === 409) {
      // El usuario ya existe
      console.log('POST /users - Error: El usuario ya existe');
      // Puedes agregar más aserciones aquí si es necesario
    } else {
      // Otro código de estado que no esperábamos, manejarlo según sea necesario
      console.log('POST /users - Error: Código de estado inesperado:', response.statusCode);
    }
  });
    

  // Prueba para actualizar un usuario existente
  test('Actualizar un usuario existente', async () => {
    const userId = 8;
    const updatedUser = { name: 'Pedro', email: 'pedro@example.com' };
    const response = await request.put(`/users/${userId}`).send(updatedUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuario actualizado exitosamente');
    console.log(`PUT /users/${userId} - Estado:`, response.statusCode);
  });


  // Función auxiliar para simular la eliminación de un usuario existente
const simulateDeleteUser = async (userId) => {
  // Realizar cualquier lógica necesaria para la simulación
  const mockResponse = { statusCode: 200, body: { message: 'Usuario eliminado exitosamente' } };
  return mockResponse;
};

  // Prueba para eliminar un usuario existente
  test('Eliminar un usuario existente', async () => {
    const userId =12;
    const response = await request.delete(`/users/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuario eliminado exitosamente');
    console.log(`DELETE /users/${userId} - Estado:`, response.statusCode);
  });
});

// Prueba para verificar que no se puede obtener el detalle de un usuario que no existe
test('No se puede obtener detalle de un usuario que no existe', async () => {
  const userId = 999; 
  const response = await request.get(`/users/${userId}`);
  expect(response.statusCode).toBe(404); 
  console.log(`GET /users/${userId} - Estado:`, response.statusCode);
});

// Prueba para verificar que no se puede actualizar un usuario que no existe por ID
test('No se puede actualizar un usuario que no existe por ID', async () => {
  const userId = 999; 
  const updatedUserData = { name: 'Nuevo nombre', email: 'nuevo@email.com' };
  const response = await request.put(`/users/${userId}`).send(updatedUserData);
  expect(response.statusCode).toBe(404); 
  console.log(`PUT /users/${userId} - Estado:`, response.statusCode);
});

// Prueba para verificar que no se puede eliminar un usuario que no existe
test('No se puede eliminar un usuario que no existe', async () => {
  const userId = 999; 
  const response = await request.delete(`/users/${userId}`);
  expect(response.statusCode).toBe(404); 
  console.log(`DELETE /users/${userId} - Estado:`, response.statusCode);
});
