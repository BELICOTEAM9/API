module.exports = {
    // Directorios donde Jest buscará pruebas
    testMatch: [
      '**/__tests__/**/*.js',
      '**/?(*.)+(spec|test).js',
    ],
    // Directorios ignorados por Jest
    testPathIgnorePatterns: [
      '/node_modules/',
      '/dist/',
    ],
    // Cobertura de código
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
      'src/**/*.js',
    ],
    // Otros ajustes según sea necesario
  };

  