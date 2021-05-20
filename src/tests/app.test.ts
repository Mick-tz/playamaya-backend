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

    })
    describe('POST /', () => {
        // const exec = async () => {
        //     const res = await request(app).get('/api');
        //     let $ = cheerio.load(res.text);
        //     csrfToken = $('[name=_csrf]')[0].val();
        //     return res;
        // };

        const getLoginCsrfs = async () => {
            const res = await request(app).get(`/api`);
            let $ = cheerio.load(res.text);
            csrfToken = ($('[name=_csrf]')[0]).attribs.value          
            cookies = res.headers['set-cookie'];
            return res;
        };

        it('POST /api/usuarios --> agrega un usuario', async () => {
            await getLoginCsrfs();
            const username = 'billyElliot2',
                password = 'qwertyasdfg7890',
                nombres = 'William',
                apellidos = 'Elliot',
                telefono =  '9876543212',
                email = 'billyElliot2@mail.com',
                genero = 'hombre';

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
                            username,
                            nombres,
                            apellidos,
                            telefono,
                            genero
                        })
                    )
                });
        });
        it('POST /api/usuarios -- valida el contenido de un request invalido', async () => {
            await getLoginCsrfs();
            console.log(csrfToken);
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
    })
    // it('PUT /api/usuarios/:id --> modifica un usuario', () => {})
    // it('DELETE /api/usuarios/:id --> elimina un usuario', () => {})
})