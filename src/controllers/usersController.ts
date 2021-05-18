import { Request, Response } from 'express';
import { ILogin, Login } from '../models/usuario';

const ejemploUsuario = {
    uuid: '1',
    username: 'willyColon',
    nombres: 'william',
    apellidos: 'colon'
}

const ejemploList = [ejemploUsuario]

class UserController {
    public renderIndex (req: Request, res: Response): void {
        res.send({ usuarios: ejemploList })
    }

    public renderUser (req: Request, res: Response): void {
        const usuario = ejemploList.filter(user => (user.uuid === req.params.id));
        const status = (usuario[0]) ? 200 : 404;
        res.status(status).send({ usuario: usuario[0] || [] });
    }
    public async addUser (req: Request, res: Response): Promise<void> {
        const { username, email, nombres, apellidos, telefono, genero, fechaNacimiento, password } = req.body
        let user: ILogin = new Login({ username, email, nombres, apellidos, telefono, genero, fechaNacimiento, password })
        user = await user.save()
        res.redirect(`/api/usuarios/${user._id }`)
        // res.send('Si claro si claro')
    }
}

export const userController = new UserController()