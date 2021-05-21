const csrfInput = document.querySelector('.csrfInput'),
    btnEliminarUsuario = document.getElementById('btnEliminarUsuario');

console.log(csrfInput.value);

btnEliminarUsuario.addEventListener('click', (e) => {

    console.log('borrando usuario');
    const formData = new FormData();
    formData.append('_csrf', csrfInput.value);

    fetch(`api/usuarios/me`, {
        method: 'DELETE',
        headers: {
            'CSRF-Token': csrfInput.value
        },
        body: formData
    })
        .then(res => res.json())
        .then(res => console.log(res));
    e.preventDefault();
})