<?php
namespace Controllers;

use Model\Cita;
use Model\Servicios;

    class APIControllers{
        public static function index(){
            $servicios=Servicios::all();
            echo(json_encode($servicios));//linea importatne porque incerta los sercvicios
           // debuguear($servicios);
        }
        public static function guardar(){

            $cita= new Cita($_POST);
            $resultado= $cita->guardar();
            echo json_encode($resultado);

         }
    }
    
?>