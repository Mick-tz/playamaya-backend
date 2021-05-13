const request = require('supertest');
const app = require('../index');

describe('users server', () => {
    it('GET /users --> array usuarios', () => {})
    it('GET /users/:id --> usuario especifico', () => {})
    it('GET /users/id --> regresa un 404 para un usuario que no existe', () => {})
    it('POST /users --> agrega un usuario', () => {})
    it('PUT /users/:id --> modifica un usuario', () => {})
    it('DELETE /users/:id --> elimina un usuario', () => {})
})