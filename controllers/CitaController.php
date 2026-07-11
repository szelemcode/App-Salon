<?php
namespace Controllers;

use MVC\Router;

class CitaController{
    public static function index(Router $router){

        //session_start(); // ya iniciada en includes/app.php
        //debuguear($_SESSION);

        $router->render('cita/index',[
            'nombre'=>$_SESSION['nombre']

        ]);
        
    }



}
?>