let paso=1;
const pasoInicial= 1;
const pasoFinal= 3;

const cita = {
    nombre: '',
    fecha: '',
    hota: '',
    servicios: [];
}//objeto que se van a guardar para almacenar en la base de datos

document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
});

function iniciarApp(){
    mostrarSeccion();//al llamar a la funcion muestra por default el paso 1
    tabs();// Cambia la seccion cuando se presionan los tabs
    botonesPaginador(); //Agrega o quita los botones del paginador
    paginaSiguiente();//Manda a la pagina siguiente
    paginaAnterior();//manda a la pagina anterior
    consultarAPI(); // consulta la Api en el backend de php
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

async function consultarAPI(){
    try {
        const url='http://localhost:3000/api/servicios';
        const resultado= await fetch(url);
        const servicios= await resultado.json();
        mostrarServicios(servicios);

    } catch (error) {
        console.log('error');
    }

}

 function mostrarServicios(servicios){
     servicios.forEach(servicio=>{
         const {id, nombre, precio} = servicio;//destructuring
         //console.log(id);
         const nombreServicio= document.createElement('P');
         nombreServicio.classList.add('nombre-servicio');
         nombreServicio.textContent = nombre
         const precioServicio= document.createElement('P');
         precioServicio.classList.add('precio-servicio');
         precioServicio.textContent = `$${precio}`
         const servicioDiv= document.createElement('DIV');
         servicioDiv.classList.add('servicio');
         servicioDiv.dataset.idServicio= id;
        //  servicioDiv.onclick = seleccionarServicio;// no se pone () porque sino se llamaria enseguida
         servicioDiv.onclick = function(){
                seleccionarServicio(servicio);
         }
         servicioDiv.appendChild(nombreServicio);
         servicioDiv.appendChild(precioServicio);
         document.querySelector('#servicios').appendChild(servicioDiv)
         
     });
 }


function seleccionarServicio(servicio){
    console.log(servicio);
}