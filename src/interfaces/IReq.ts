import { Request } from "express"

export interface IRequest extends Request {
    query: {
        pagina?: string;
        nombres?: string;
        apellidos?: string;
    },
}