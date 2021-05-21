import { Login } from '../models/usuario';
import { Request, Response, NextFunction } from 'express';

export const auth = async (req: any, res: Response, next: NextFunction) => { // TODO: Fix req as any
    
    try {
        
        const usuario = await Login.findById(req.session.userId);
        if (!usuario) {
            throw new Error('Invalid session userId');
        }
        req.usuario = usuario;
        next()
    } catch (error) {
        res.status(400).send({ error: 'usuario no autenticado '});
    }
}
