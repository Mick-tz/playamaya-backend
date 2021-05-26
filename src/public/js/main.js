const csrfInput = document.querySelector('.csrfInput'),
    btnEliminarUsuario = document.getElementById('btnEliminarUsuario'),
    alertaRespuesta = document.querySelector('.alerta-respuesta'),
    alertaRespuestaStrongText = document.querySelector('.alerta-respuesta-strong'),
    alertaRespuestaText = document.querySelector('.alerta-respuesta-text'),
    spinnerCargandoDelete = document.querySelector('.spinner-cargando-delete-usuario'),
    modalUsuariosDelete = new bootstrap.Modal(document.getElementById('modalUsuariosDelete'));

console.log('toggle cargado');
btnEliminarUsuario.addEventListener('click', (e) => {

    const formData = new FormData();
    formData.append('_csrf', csrfInput.value);
    spinnerCargandoDelete.classList.remove('d-none');

    fetch(`api/usuarios/me`, {
        method: 'DELETE',
        headers: {
            'CSRF-Token': csrfInput.value
        },
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            modalUsuariosDelete.hide();
            if (res.error) {
                alertaRespuestaStrongText.textContent = 'Error: ';
                alertaRespuestaText.textContent = res.error;
                alertaRespuesta.classList.remove('alert-success');
                alertaRespuesta.classList.add('alert-danger');
            } else {
                alertaRespuestaStrongText.textContent = 'SUCCESS: ';
                alertaRespuestaText.textContent = `usuario ${res.usuario.username} eliminado.`;
            }
            alertaRespuesta.classList.add('show');
            spinnerCargandoDelete.classList.add('d-none');
        });
    e.preventDefault();
})