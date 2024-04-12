// Importar los módulos necesarios
const { getUsers, getUserById } = require('../../models/userModel');

// Mockear las funciones getUsers y getUserById
jest.mock('../../models/userModel');

describe('Users API', () => {
  // Prueba para [GET] /users
  it('[GET] /users', async () => {
    // Definir los usuarios simulados para la prueba
    const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    
    // Mockear la respuesta de la función getUsers
    getUsers.mockResolvedValue(mockUsers);

    // Simular una solicitud GET a /users
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn()
    };

    // Ejecutar la función getUsers con la solicitud y la respuesta simuladas
    await getUsers(req, res);

    // Verificar que getUsers haya sido llamado
    expect(getUsers).toHaveBeenCalled();
    // Verificar que la respuesta JSON coincida con los usuarios simulados
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  // Prueba para [GET] /users/:id
  it('[GET] /users/:id', async () => {
    // Definir el usuario simulado para la prueba
    const mockUser = { id: 1, name: 'User 1' };
    
    // Mockear la respuesta de la función getUserById
    getUserById.mockResolvedValue(mockUser);

    // Simular una solicitud GET a /users/:id con ID = 1
    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn()
    };

    // Ejecutar la función getUserById con la solicitud y la respuesta simuladas
    await getUserById(req, res);

    // Verificar que getUserById haya sido llamado con el ID correcto
    expect(getUserById).toHaveBeenCalledWith(1);
    // Verificar que la respuesta JSON coincida con el usuario simulado
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });
});
