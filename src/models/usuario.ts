import mongoose, { Schema, model, Document } from 'mongoose';
import bycrypt from 'bcryptjs';
const validator = require("validator");

// strongly typed model
export interface ILogin extends Document {
    username: string;
    email: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    genero?: string;
    fechaNacimiento?: Date;
    password: string;
}

const loginSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value: String) {
            if (!validator.isEmail(value)) {
                throw new Error('Please use a valid email address.')
            }
        }
    },
    nombres: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    telefono: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 9,
        validate(value: string) {
            let expSoloNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (!expSoloNum.test(value)) {
                throw new Error('Favor de incluir un número de teléfono valido')
            }
        }
    },
    genero: {
        type: String,
        trim: true,
    },
    fechaNacimiento: {
        type: Date
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 12,
        validate(value: string) {
            if (value.toLowerCase().includes('password') || value.toLowerCase().includes('contraseña')) {
                throw new Error('Contraseña invalida.')
            }
        }
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password
        }
    },
    toObject: {
        transform: function(doc, ret) {
            delete ret.password
        }
    }
});

loginSchema.methods.genAuthToken = async function () {
    const login = (this as ILogin);
    console.log(login);
}

// loginSchema.methods.toJSON = function () {
//     const usuario: ILogin = this;
//     const objetoUsuario = usuario.toObject();

//     delete objetoUsuario.password
    
//     return objetoUsuario
// }

// hash de la contraseña, no usar arrow foos dado que no harán el binding de forma correcta:
loginSchema.pre('save', async function(next) {
    const usuario = (this as ILogin);
    if (usuario.isModified('password')) {
        usuario.password = await bycrypt.hash(usuario.password, parseInt(process.env.BC_WORKFACTOR || '14'));
    }
    next()
})

export const Login = model<ILogin>('login', loginSchema);