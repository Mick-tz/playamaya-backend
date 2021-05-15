import { Request, Response } from 'express';

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
    public addUser (req: Request, res: Response): void {
        console.log(req.body);
        res.send('Si claro si claro')
    }
}

export const userController = new UserController()