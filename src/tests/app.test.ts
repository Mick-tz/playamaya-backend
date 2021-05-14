const request = require('supertest');
import { Response } from 'supertest';
const app = require('../index');

describe('users server', () => {
    it('GET /api/usuarios --> array usuarios', () => {
        return request(app)
            .get('/api/usuarios')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response: any) => {
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
        );
    })
    it('GET /api/usuarios/:id --> usuario especifico', () => {
        return request(app)
            .get('/api/usuarios/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response: any) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        username: expect.any(String),
                        nombres: expect.any(String),
                        apellidos: expect.any(String),
                        // TODO: Agregar expect de imagen
                        // avatar: expect.any(String),
                    })
                )
            }
        );
    })
    it('GET /api/usuarios/:id --> regresa un 404 para un usuario que no existe', () => {
        return request(app)
            .get('/api/usuarios/1')
            .expect('Content-Type', /json/)
            .expect(404);
    })
    it('POST /api/usuarios --> agrega un usuario', () => {
        return request(app)
            .post('/api/usuarios').send({
                username: 'billyElliot',
                password: 'qwerty7890',
                nombres: 'William',
                apellidos: 'Elliot',
                telefono: '9876543210'
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response: Response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        username: 'billyElliot',
                        password: 'qwerty7890',
                        nombres: 'William',
                        apellidos: 'Elliot',
                        telefono: '9876543210'
                    })
                )
            });
    });
    it('POST /api/usuarios -- valida el contenido del request', () => {
        return request(app)
            .post('/api/usuarios')
            .send({
                username: 123
            })
            .expect(422);
    });
    // it('PUT /api/usuarios/:id --> modifica un usuario', () => {})
    // it('DELETE /api/usuarios/:id --> elimina un usuario', () => {})
})