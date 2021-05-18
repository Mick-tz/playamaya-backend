import { Request, Response } from 'express';
import { ILogin, Login } from '../models/usuario';

const PER_PAGE_RESULTS = 20;

class UserController {
    public async renderIndex (req: Request, res: Response): Promise<void> {
        const pagina = parseInt(req.params.pagina) || 0;
        try {
            const usuarios = await Login.find()
                .sort('-createdAt')
                .limit(PER_PAGE_RESULTS)
                .skip(pagina*PER_PAGE_RESULTS)
                .select('-createdAt -updatedAt');
            res.send({ usuarios });
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
}

export const userController = new UserController()