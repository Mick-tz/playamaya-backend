const request = require('supertest');
const cheerio   = require('cheerio');
import { Response } from 'supertest';
const app = require('../index');

// TODO: Revisar si esto se puede arreglar (jsdom.env está decomisada )
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// let token;
// let cookies;
// beforeEach((done) => {
//     request(app)
//         .get('/api')
//         .end((err: any, res: any) => {
//             // set cookies
//             cookies = res.headers['set-cookie'];
//             // set csrf token
//             jsdom.env(res.text, (err: any, window: any) => {
//                 token = window.document.getElementByName('_csrf')[0].value;
//                 done();
//             });
//         })
// });

let csrfToken: string,
    cookies: string;



describe('USUARIOS', () => {
    // atributos
    const username = 'billyElliot2',
        password = 'qwertyasdfg7890',
        nombres = 'william',
        apellidos = 'elliot',
        telefono =  '9876543212',
        email = 'billyElliot2@mail.com',
        genero = 'hombre';

    // helpers
    const getCsrfs = async () => {
        const res = await request(app).get(`/api`);
        let $ = cheerio.load(res.text);
        csrfToken = ($('[name=_csrf]')[0]).attribs.value;
        cookies = res.headers['set-cookie'];
        return res;
    }
    const getSession = async () => {
        await getCsrfs();
        const res = await request(app).post(`/api/usuarios/login`)
            .set('Cookie', cookies)
            .type('form')
            .send({login: username, password, _csrf: csrfToken});

        cookies = res.headers['set-cookie'];
    }

    describe(`GET /`, () => {
        it('GET /api/usuarios --> array usuarios', () => {
            return request(app)
                .get('/api/usuarios')
                .expect('Content-Type', /json/)
                .expect(200)
                .then((response: any) => {
                    expect(response.body.usuarios).toEqual(
                        expect.arrayContaining([
                            expect.objectContaining({
                                username: expect.any(String),
                                nombres: expect.any(String),
                                apellidos: expect.any(String)
                                // TODO: Agregar expect de imagen
                                // avatar: expect.any(String),
                            })
                        ])
                    )
                }
            );
        })
        it('GET /api/usuarios/:id --> usuario existente', () => {
            return request(app)
                .get('/api/usuarios/60a40510b3312223b992ccb9')
                .expect('Content-Type', /json/)
                .expect(200)
                .then((response: any) => {
                    expect(response.body.usuario).toEqual(
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
                .get('/api/usuarios/666')
                .expect('Content-Type', /json/)
                .expect(404);
        })

    });
    describe('POST /', () => {
        // const exec = async () => {
        //     const res = await request(app).get('/api');
        //     let $ = cheerio.load(res.text);
        //     csrfToken = $('[name=_csrf]')[0].val();
        //     return res;
        // };

        it('POST /api/usuarios --> agrega un usuario', async () => {
            await getCsrfs();

            const nuevoUsuario = {
                username,
                password,
                nombres,
                apellidos,
                telefono,
                email,
                genero,
                fechaNacimiento: '2010-02-26',
                _csrf: csrfToken
            }
            
            return request(app)
                .post('/api/usuarios')
                .set('Cookie', cookies)
                .type('form')
                .send(nuevoUsuario)
                .expect(201)
                .expect('Content-Type', /json/)
                .then((response: Response) => {
                    expect(response.body.usuario).toEqual(
                        expect.objectContaining({
                            username: expect.any(String),
                            __v: expect.any(Number),
                            _id: expect.any(String),
                            nombres: expect.any(String),
                            apellidos: expect.any(String),
                            createdAt: expect.any(String),
                            email: expect.any(String),
                            genero: expect.any(String),
                            updatedAt: expect.any(String),
                            fechaNacimiento: expect.any(String)
                            // nombres,
                            // apellidos,
                            // telefono,
                            // genero
                        })
                    )
                });
        });
        it('POST /api/usuarios --> valida el contenido de un request invalido', async () => {
            await getCsrfs();
            return request(app)
                .post('/api/usuarios')
                .set('Cookie', cookies)
                .type('form')
                .send({
                    username: 123,
                    _csrf: csrfToken
                })
                .expect(400)
                .expect('Content-Type', /json/);
        });
        // ¡CUIDADO! Este post debe ir después del post de CREATE para poder autenticar el usuario recien creado.
        it('POST /api/usuarios/login --> autentica a un usuario usando username y password', async () => {
            await getCsrfs();
            return request(app)
                .post('/api/usuarios/login')
                .set('Cookie', cookies)
                .type('form')
                .send({
                    login: username,
                    password,
                    _csrf: csrfToken
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .then((response: Response) => {
                    expect(response.body.usuario).toEqual(expect.objectContaining({
                        username: expect.any(String),
                        email: expect.any(String),
                        nombres: expect.any(String),
                        apellidos: expect.any(String)
                    }));
                });
        });
        it('POST /api/usuarios/login --> falla en autenticar a un usuario (pwd incorrecta)', async () => {
            await getCsrfs();
            return request(app)
                .post('/api/usuarios/login')
                .set('Cookie', cookies)
                .type('form')
                .send({
                    login: username,
                    password: 'EstaNoEsMiPWD',
                    _csrf: csrfToken
                })
                .expect(401)
                .expect('Content-Type', /json/);
        });
        it('POST /api/usuarios/login --> falla en autenticar a un usuario (usuarios inexistente)', async () => {
            await getCsrfs();
            return request(app)
                .post('/api/usuarios/login')
                .set('Cookie', cookies)
                .type('form')
                .send({
                    login: 'Colibrilya',
                    password,
                    _csrf: csrfToken
                })
                .expect(401)
                .expect('Content-Type', /json/);
        });
    });
    // ¡CUIDADO! Este módulo debe ir antes de el módulo de delete para asegurar que el usuario a modificar existe
    // ¡CUIDADO! Si modificas el usuario (contraseña o correo), modificar los campos correspondientes para no romper la función getSession 
    describe('PATCH /', () => {
        it('PATCH /api/usuarios/me --> cambia los nombres de un usuario', async () => {
            await getSession();

            const patchInfo = {
                nombres: 'megatron',
                _csrf: csrfToken
            }

            return request(app)
                .patch('/api/usuarios/me')
                .set('Cookie', cookies)
                .type('form')
                .send(patchInfo)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response: Response) => {
                    expect(response.body.usuario).toEqual(
                        expect.objectContaining({
                            nombres: "megatron"
                        })
                    )
                });
        });
        it('PATCH /api/usuarios/me --> cambia el correo de un usuario', async () => {
            await getSession();

            const patchInfo = {
                email: 'megatron@test.com',
                _csrf: csrfToken
            }

            return request(app)
                .patch('/api/usuarios/me')
                .set('Cookie', cookies)
                .type('form')
                .send(patchInfo)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response: Response) => {
                    expect(response.body.usuario).toEqual(
                        expect.objectContaining({
                            email: "megatron@test.com"
                        })
                    )
                });
        });
        it('PATCH /api/usuarios/me --> falla en cambiar los apellidos de un usuario sin sesión activa', async () => {
            await getCsrfs();

            const patchInfo = {
                apellidos: 'bonaparte',
                _csrf: csrfToken
            }

            return request(app)
                .patch('/api/usuarios/me')
                .set('Cookie', cookies)
                .type('form')
                .send(patchInfo)
                .expect(401)
                .expect('Content-Type', /json/);
        });
    })
    describe('DELETE /', () => {
        // CUIDADO, ESTE DELETE DEBE IR DESPUES DEL POST PARA ASEGURAR QUE EXISTE EL USUARIO QUE SE VA A ELIMINAR
        it('DELETE /api/usuarios/me --> autentica y elimina a un usuario', async () => {
            await getSession();
            return request(app)
                .delete('/api/usuarios/me')
                .set('Cookie', cookies)
                .type('form')
                .send({
                    _csrf: csrfToken
                })
                .expect(200)
                .expect('Content-Type', /json/);
        });

        it('DELETE /api/usuarios/me --> intenta eliminar un usuario y falla al no estar autenticado', async () => {
            await getCsrfs();
            return request(app)
                .delete('/api/usuarios/me')
                .set('Cookie', cookies)
                .type('form')
                .send({
                    _csrf: csrfToken
                })
                .expect('Content-Type', /json/)
                .expect(401);
        })
    });
    // it('PUT /api/usuarios/:id --> modifica un usuario', () => {})
    // it('DELETE /api/usuarios/:id --> elimina un usuario', () => {})
})