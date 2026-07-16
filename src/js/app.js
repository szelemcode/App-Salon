let paso=1;

document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
});

function iniciarApp(){
    tabs();// Cambia la seccion cuando se presionan los tabs
}

function mostrarSeccion(){
     //Ocultar la seccion que tenga la clase de mostrar
     const seccionAnterior=document.querySelector('.mostrar');
     //console.log(seccionAnterior);
    if(seccionAnterior){   // si existe se retira porque si no existe daria error
    seccionAnterior.classList.remove('mostrar');//va sin punto
    }
    // Seleccionar la seccion con el paso..
    const pasoSelector=`#paso-${paso}`;
    //console.log(pasoSelector);
    const seccion= document.querySelector(pasoSelector);
    //console.log(seccion);
    seccion.classList.add('mostrar');
 }
function tabs(){
    const botones = document.querySelectorAll('.tabs button');//hay que iterar para que recorra los valores
    botones.forEach(boton=>{
        boton.addEventListener('click',function(e){
            paso = parseInt(e.target.dataset.paso);//cambia el string que se obtuvo y lo guardo en paso
            //console.log(e.target);
            //console.log(paso);
            mostrarSeccion();
        });
    })
    
}
