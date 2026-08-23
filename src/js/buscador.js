document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});



function iniciarApp() {
    buscarPorFecha();
}

function buscarPorFecha() {
    const fechaInput=document.querySelector('#fecha');
    //console.log('desde buscar por fecha');
    fechaInput.addEventListener('input',function(e){
        const fechaSeleccionada=e.target.value;
        window.location=`?fecha=${fechaSeleccionada}`;//mandamos por query string la fecha que el usuario a seleccionado
        //console.log(fechaSeleccionada);
    })
}