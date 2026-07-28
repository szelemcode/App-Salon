let paso=1;
const pasoInicial= 1;
const pasoFinal= 3;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
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
    nombreCliente();// agrega el nombre del cliente al objeto de cita
    seleccionarFecha();//agrega la fecha de la cita en el objeto
    seleccionarHora();//agrega la hora de la cita en el objeto
    //mostrarResumen();//Muestra el resumen de la cita no hace falta iniciarlo aca
    //se llama en el paso 3 y la seccion de inicio esta en el paso 1
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
            e.preventDefault();

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
        //console.log('estoy en el paso: ', paso);
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }else if(paso === 3){
        //console.log('estoy en el paso: ',paso);
        paginaAnterior.classList.remove('ocultar');
         paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    
    }else{
        //console.log('estoy en el paso: ',paso);
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
         servicioDiv.onclick = function(){//call back
                seleccionarServicio(servicio);
         }
         servicioDiv.appendChild(nombreServicio);
         servicioDiv.appendChild(precioServicio);
         document.querySelector('#servicios').appendChild(servicioDiv)
         
     });
 }////

function seleccionarServicio(servicio){
    const {id} = servicio;//extraigo el id de servicio con destructuring
    const {servicios} = cita;///destructuring creo una variable[] servicios con los valores del objeto cita

    //Selector que identifica el elemento ,identifica el elemento que se le da click
    const servicioDiv=document.querySelector(`[data-id-servicio="${id}"]`);
   
   //Comprobar si un servicio ya fue agregado
   if(servicios.some(agregado =>agregado.id === id) ) {
    //eliminarlo
    cita.servicios = servicios.filter(agregado => agregado.id !=id);
    servicioDiv.classList.remove('seleccionado');
   }else{
    //agregarlo
    cita.servicios = [...servicios,servicio];//rest operator tomo una copia de los servicios y ke agrego el servvicio a agregar
    servicioDiv.classList.add('seleccionado');
    }
    console.log(cita);
}

function nombreCliente(){
    cita.nombre=document.querySelector('#nombre').value;
    //const nombre=document.querySelector('#nombre').value; // forma larga
    //cita.nombre=nombre;
    console.log(cita);
}

function seleccionarFecha(){
    const inputFecha=document.querySelector('#fecha');
    inputFecha.addEventListener('input',function(e){
       //console.log(e.target.value);
       const dia = new Date(e.target.value).getUTCDay();
       if([6,0].includes(dia)) {//busca los numeros 6 y 0 en dia
        e.target.value=''; //si exsite seteo el value para que no lo puedan elegir
       mostrarAlerta('Fines de semanas no permitidos', 'error', '.formulario');//llamamos a esta funcion para no cargar mucho esta y que muestre una alerta
       }else{
        cita.fecha=inputFecha.value;
       }
    });
}

function seleccionarHora(){
    const inputHora=document.querySelector('#hora');
    inputHora.addEventListener('input',function(e){
        //cita.hora=e.target.value;
        const horaCita=e.target.value;
        const hora=horaCita.split(":")[0];
        if(hora  <10 || hora> 18 ){
        mostrarAlerta('Hora no valida','error','.formulario');
        e.target.value='';//hacemos esto para que no quede la hora no valida en el input
        }else{
            cita.hora=hora;
            //console.log('hora valida')
        }

    });
   // console.log(horaSeleccionada);

} 

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true){//de esta manera se puede reutilizar
    //Previene que se genere mas de una alerta
    const alertaPrevia=document.querySelector('.alerta'); //controlamos que solo haya una alerta
    if(alertaPrevia) //return;//si hay una alerta detengo el codigo esto es si tuvieramos alguna
    //que desaparece , pero ahora tenemos una que queda fija
    {
        alertaPrevia.remove();
    }

    //Scripting para crear la alerta
    const alerta=document.createElement('DIV');
    alerta.textContent=mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia=document.querySelector(elemento);
    referencia.appendChild(alerta);

    //Eliminar la alerta
    if(desaparece){ // si desaparece esta por default elimina la alerta
        setTimeout(() => {
        alerta.remove();
    },3000);
    }
    
        
}

function mostrarResumen(){
      const resumen = document.querySelector('.contenido-resumen')

      //resumen.innerHTML='';
      //limpiar el contenido de resumen
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);//
    }
      //console.log(cita.servicios.length);
      if(Object.values(cita).includes('') || cita.servicios.length === 0 ){//
          mostrarAlerta('Faltan datos de servicios, Fecha u Hora', 'error','.contenido-resumen',false);
        return;
    }

    //formatear el div de resumen
    const{nombre,fecha,hora,servicios}=cita; //destructuring 

    const nombreCliente=document.createElement('P');
        nombreCliente.innerHTML=`<span>Nomre:</span>${nombre}`;

        const fechaCita=document.createElement('P');
        fechaCita.innerHTML=`<span>Fecha:</span>${fecha}`;

       const horaCita=document.createElement('P');
        horaCita.innerHTML=`<span>Hora:</span>${hora}`;

        resumen.appendChild(nombreCliente);
        resumen.appendChild(fechaCita);
        resumen.appendChild(horaCita);

        servicios.forEach(servicio=>{
            const{id,precio,nombre}=servicio;//destructuring a cada pasada del foreach
            const contenedorServicios=document.createElement('DIV');
            contenedorServicios.classList.add('contenedor-servicio');
            
            const textoServicio=document.createElement('P');
            textoServicio.textContent=nombre;

            const precioServicio=document.createElement('P');
            precioServicio.innerHTML=`<span>Precio:</span>$ ${precio}`;

            contenedorServicios.appendChild(textoServicio);
            contenedorServicios.appendChild(precioServicio);

            resumen.appendChild(contenedorServicios); 
            })
        
       
        
       

        // console.log(nombreCliente);
        // console.log(fechaCliente);
        // console.log(horaCliente);
        // console.log(serviciosCliente);


}

//   function mostrarResumen(){ esta funciona la hice yo pero no es la del tutorial
//       const resumen = document.querySelector('.contenido-resumen')
//       //console.log(cita.servicios.length);
//       if(Object.values(cita).includes('') || cita.servicios.length === 0 ){//
//           mostrarAlerta('Faltan datos de servicios, Fecha u Hora', 'error','.contenido-resumen',false);
//       }else{
           
//           document.querySelector('.alerta')?.remove();//forma corta de preguntar si existe alerta y si existe removerla
//           mostrarAlerta('Agendado Correctamente', 'exito','.contenido-resumen');
//           console.log('resumen correcto');
//       }
//     }
  

