let paso=1;
const pasoInicial= 1;
cons=pasoFinal= 3;

document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
});

function iniciarApp(){
    mostrarSeccion();//al llamar a la funcion muestra por default el paso 1
    tabs();// Cambia la seccion cuando se presionan los tabs
    botonesPaginador(); //Agrega o quita los botones del paginador
    paginaSiguiente();//Manda a la pagina siguiente
    paginaAnterior()//manda a la pagina anterior
}

function mostrarSeccion(){//muestra el paso que esta activo y lo muestra
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

    //QUITA LA CLASE ACTUAL
     const tabAnterior=document.querySelector('.actual');
     if(tabAnterior){
         tabAnterior.classList.remove('actual')
     }

    //Resalta el tab actual
     const tab=document.querySelector(`[data-paso="${paso}"]`);
     tab.classList.add('actual');

 }
function tabs(){
    const botones = document.querySelectorAll('.tabs button');//hay que iterar para que recorra los valores
    botones.forEach(boton=>{
        boton.addEventListener('click',function(e){
            paso = parseInt(e.target.dataset.paso);//cambia el string que se obtuvo y lo guardo en paso
            mostrarSeccion();
            botonesPaginador();//llama a la funcion para que se muestren o no los botones de la paginacion
        });
    });
    
}

function botonesPaginador(){
    const paginaAnterior=document.querySelector('#anterior');
    const paginaSiguiente=document.querySelector('#siguiente');
    if(paso === 1){
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }else if(paso === 3){
        paginaAnterior.classList.remove('ocultar');
         paginaSiguiente.classList.add('ocultar');
    }else{
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
     
    mostrarSeccion();//esto es para cuando esta funcion sea llamada por pagina anterior 
    //o paginaSiguiente me muestre la seccion correspondiente
}


function paginaAnterior(){
    const paginaAnterior=document.querySelector('#anterior');
    paginaAnterior.addEventListener('click',function(){
        if(paso<=pasoInicial) return;
        paso--;//hasta aca resta
        botonesPaginador();//valida la paginacion tiene la logica para mostrar o ocultar el paginador
    });
}

function paginaSiguiente(){
    const paginaSiguiente=document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click',()=>{// 
        if(paso>=pasoFinal)return;
        paso++;
        botonesPaginador();//logica para mostrar el paginador
    });

}