## endpoints

#### Usuarios

---

*OBS: Todas las formas deben contener un csrftoken*

*OBS: Los endpoints marcados con  "auth_required" requieren que el user esté autenticado (via una cookie de sesión firmada y encriptada por el server)*

```
GET - api/usuarios?apellidos=Str&nombres=Str&pagina=int
(Regresa el perfil de usuario, ordenados alfabéticamente por apellido, 20 por página)

response:
  {
    "usuarios": Array[Usuario],
    "pagintation_info": PaginationInfo,
  }

GET - api/usuarios/:id
  response:
    {
      "usuario": Usuario,
    }

POST - api/usuarios
  request:
    {
      Login
    }

  response:
    {
      "usuario": Usuario
    }

POST - api/usuarios/login
(regresa la info del usuario autenticado y la cookie de sesión)
  request:
    {
      login: email || username,
      password
    }

  response:
    {
      "usuario": Usuario
    }

POST - api/usuarios/reset_password
(envía correo con liga para reset de password)
  request:
    {
      login: email || username,
    }

  response
    {
      "status": HTTPStatus
    }

POST - api/usuarios/logout
(destruye la sesión, en caso de que exista)
  response:
    {
       "status": HTTPStatus
    }


PATCH - api/usuarios/me
  response:
    {
      "usuario": Usuario
    }

DELETE - api/usuarios/me
  response:
    {
      "usuario": Usuario
    }
```


#### Perfil

```
TODO: Definir
```

#### Profesores

```
GET - api/profesores?apellidos=Str&nombres=Str
(Regresa el perfil de profesor, ordenados alfabéticamente por apellido, 20 por página)

  response:
    {
      "profesores": Array[Profesor],
      "pagintation_info": PaginationInfo,
    }

GET - api/profesor/:id
  response:
    {
      "profesor": Profesor,
    }

POST - api/profesor
  response: 
    {
      "profesor": Profesor
    }

PUT - api/profesor/:id
  response: 
    {
      "profesor": Profesor
    }

DELETE - api/profesor/:id
  response:
    {
      "profesor": Profesor
    }

```

### Clases

```
(Regresa las clases, ordenados crecientemente temporalmente, 20 por página)

GET - api/clases?tipo_baile=TipoBaile
  response:
    {
      "clases": Array[Clase],
      "pagintation_info": PaginationInfo,
    }

GET - api/clase/:id
  response:
    {
      "clase": Clase,
    }


@AUTH_REQUIRED
POST - api/Clase
  response:
    {
      "clase": Clase
    }

PATCH - api/clase/:id
  response:
    {
      "clase": Clase
    }

DELETE - api/clase/:id
response:
    {
      "clase": Clase
    }
```

### Sociales

```
(Regresa los sociales ordenados crecientemente temporalmente, 20 por página)

GET - api/sociales?tipo_baile=TipoBaile
  response:
    {
      "sociales": Array[Social],
      "pagintation_info": PaginationInfo,
    }

GET - api/social/:id
  response:
    {
      "social": Social,
    }


@AUTH_REQUIRED
POST - api/social
  response:
    {
      "social": Social
    }

PATCH - api/social/:id
  response:
    {
      "social": Social
    }

DELETE - api/social/:id
response:
    {
      "social": Social
    }
```

#### Academias

```
GET - api/academias
  response
   {
     "academias": Array[Academia]
   }

POST - api/academia
 response
   {
     "academia": Academia
 }

PUT - api/academia/:id
 response
   {
     "academia": Academia
 }
 
DELETE - api/academia/:id
 response
   {
     "academia": Academia
 }

```
