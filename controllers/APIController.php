<?php
namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicios;

    class APIController{
        public static function index(){
            $servicios=Servicios::all();
            echo(json_encode($servicios));//linea importatne porque incerta los sercvicios
           // debuguear($servicios);
        }
        public static function guardar(){
            
            //Almacena la cita y devuelve el ID
             $cita= new Cita($_POST);
             $resultado= $cita->guardar();

             $id = $resultado['id']; //extraigo el id del resultado que viene de la base de datos

            //Almacena la Cita y el Servicio
            //$_POST['servicios'];//debuelve un string ej '1,2,3,4'
            //Almacena los Servicios con el id de la cita
            $idServicios= explode(",", $_POST['servicios']);//extraigo el string y lo convierto en un arreglo indexado
            
            foreach($idServicios as $idServicio) {//ahora se puede recorrer
                $args = [
                    'citaId' => $id,
                    'servicioId' => $idServicio
                ];
                $citaServicio = new CitaServicio($args);// me crea una instancia de citaServicio
                $citaServicio -> guardar(); // este va a ir iterando cada uno de los servicios y lo va a guardar en la DB con la referencia de la cita
            }

            //retornamos una respuesta
            echo json_encode(['resultado' => $resultado]);

         }

         public static function eliminar(){
            if ($_SERVER['REQUEST_METHOD'] === 'POST'){
                $id = $_POST['id'];
               $cita = Cita::find($id);
               $cita->eliminar();
               header('Location:' . $_SERVER["HTTP_REFERER"]);
               //debuguear($cita);
            }
           
         }
    }
    
?>