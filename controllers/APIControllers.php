<?php
namespace Controllers;

use Model\Servicios;

    class APIControllers{
        public static function index(){
            $servicios=Servicios::all();
            echo(json_encode($servicios));//linea importatne porque incerta los sercvicios
           // debuguear($servicios);
        }
    }
?>