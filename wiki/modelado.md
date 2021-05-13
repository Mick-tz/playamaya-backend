## Modelado

*Todos los modelos heredan de una clase base que agrega uuid, hora de creación y modificación de forma automática*

*Los campos que no permiten repeticiones son procedidos por la palabra "UNIQUE", todo campo de uuid no permite repeticiones dentro de su relación*

*Los campos opcionales en los objetos se indican con la palabra "BLANK"*

*Todo campo no seguido por la palabra "BLANK" es considerado obligatorio*

*Los campos que son procedidos por la palabra "AUTO" serán agregados de forma automática sin la participación del usuario.*

*Los campos que corresponden a un id (uuid) de otro objeto se siguen de "FK" y las llaves primarias (uuid) de "PK"*

```
User: {
    """
    Modelo abstracto. Contiene los datos genéricos requeridos por cualquier tipo de usuario, puede ser extendido 
    """

    username: Str,
    nombres: Str,
    apellidos: Str,
    fecha_nacimiento: Date,                                  "BLANK"
    telefono: Str,
    genero: Str,                                             "BLANK"
    correo: Email,
    password: HashedStr,
    tokens: Array[csrf_tokens]

}

Profesor: {
    """
    Extiende a usuario. Representa un profesor o profesora.
    """

    pareja: Profesor,                                           "BLANK FK"   
    tipo_baile: Array[TipoBaile],
    academia: Academia,                                         "BLANK FK"
    imagen: Blob                                                "BLANK"
}

Estudiante: {
    """
    Extiene a usuario. Representa un estudiante/bailarin.
    """

    intereses_tipo_baile: Array[TipoBaile],                     "BLANK"   
    imagen: Blob,
    
}

# Tipo de baile será un enum con los posibles tipos de bailes a escoger
TipoBaile: Str -> [
    salsa,
    bachata,
    tango,
    forró,
    cumbia,
    danzón,
    reggaeton
]

Academia: {
    """
    Modelo de una academia de baile.
    """

    nombre_academia: Str,                             
    direccion: Str,
    telefono: Str,
    tipos_baile: Array[TipoBaile],
    email: Str,
    imagen: blob,                                   "BLANK"
    responsable: User,                              "FK"

}

Clase: {
    """
    Modelo de una clase.
    """

    profesor: Profesor,                              "FK"
    horario: DateTime,                               
    fecha: Array[Date],
    academia: Academia,                             "BLANK"
    tipo_baile: TipoBaile,
    direccion: Str,
    imagen: blob,                                   "BLANK"
    numero_referencia: Str
    costo: Float

}

Social: {
    """
    Modelo de un social/ noche de baile.
    """
    encargado: User,                                  "FK"
    horario: DateTime,                               
    fecha: Array[Date],
    academia: Academia,                                 "BLANK"
    tipo_baile: TipoBaile,
    direccion: Str,
    imagen: blob,                                   "BLANK"
    numero_referencia: Str
    costo: Float

}

```

*TODO: Agregar modelado de estilos de baile.*
