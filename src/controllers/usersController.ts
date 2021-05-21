import { Request, Response } from 'express';
import { IRequest } from '../interfaces/IReq';
import { ILogin, Login } from '../models/usuario';

const PER_PAGE_RESULTS = 5;

class UserController {
    public async renderIndex (req: IRequest, res: Response): Promise<void> {
        const pagina = (req.query.pagina) ? parseInt(req.query.pagina): 0;
        try {
            Login.find()
                .sort('-createdAt')
                .limit(PER_PAGE_RESULTS)
                .skip(pagina*PER_PAGE_RESULTS)
                .select('-createdAt -updatedAt')
                .exec((err, data) => {
                    if (err) throw err;
                    Login.countDocuments({}).exec((err, count) => {
                        res.send({ usuarios: data, pagination_info: { pagina, num_paginas: Math.ceil(count / PER_PAGE_RESULTS)} });
                    })
                });
        } catch (error) {
            res.status(400).send({ error });
        }
    }

    public async renderUser (req: Request, res: Response): Promise<void> {
        const id = req.params.id || -1;
        try {
            if (id === -1) {
                throw new Error("Usuario invalido");
            }
            const usuario = await Login.findOne({_id: id})
                .select('-createdAt -updatedAt');
            res.status(200).send({ usuario });
        } catch (error) {
            res.status(404).send({error});
        }
    }

    public async loginUser (req: any, res: Response):Promise<void> {
        try {
            const usuario = await Login.findByCredentials(req.body.login, req.body.password);
            req.session.userId = usuario._id;
            res.send({ usuario });
        } catch (error) {
            res.status(401).send({ error: 'Unable to login' })
        }
    }

    public async addUser (req: Request, res: Response) {
        const { username, email, nombres, apellidos, telefono, genero, fechaNacimiento, password } = req.body
        let usuario: ILogin = new Login({ username, email, nombres, apellidos, telefono, genero, fechaNacimiento, password })
        try {
            await usuario.save()
            res.status(201).send({ usuario });
        } catch (error) {
            res.status(400).send({ error });   
        }
    }

    public async deleteUser (req: any, res: Response) { // TODO: Fix asignación de any
        try {
            await req.usuario.remove()
            delete req.session.userId
            res.send(req.usuario)
        } catch (error) {
            res.status(400).send({error})
        }
    }
}

export const userController = new UserController()