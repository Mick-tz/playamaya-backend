const request = require('supertest');
const app = require('../index');

describe('users server', () => {
    it('GET /api/usuarios --> array usuarios', () => {
        return request(app)
            .get('/api/usuarios')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining(
                        expect.objectContaining({
                            username: expect.any(String),
                            nombres: expect.any(String),
                            apellidos: expect.any(String),
                            // TODO: Agregar expect de imagen
                            // avatar: expect.any(String),
                        })
                    )
                )
            }
        )
    })
    it('GET /api/usuarios/:id --> usuario especifico', () => {})
    it('GET /api/usuarios/:id --> regresa un 404 para un usuario que no existe', () => {})
    it('POST /api/usuarios --> agrega un usuario', () => {})
    it('PUT /api/usuarios/:id --> modifica un usuario', () => {})
    it('DELETE /api/usuarios/:id --> elimina un usuario', () => {})
})