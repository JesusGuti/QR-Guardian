export default {
    preset: 'jest-expo',
    setupFiles: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'node', // Esto es clave para evitar problemas con APIs del navegador
    transform: {},
}