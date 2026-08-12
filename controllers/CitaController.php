<?php
namespace Controllers;

use MVC\Router;

class CitaController{
    public static function index(Router $router){

        //session_start(); // ya iniciada en includes/app.php
        //debuguear($_SESSION);

        isAuth();

        $router->render('cita/index',[
            'nombre'=>$_SESSION['nombre'],
            'id'=>$_SESSION['id'] // de esta forma la variable va a estar disponible en la vista

        ]);
        
    }



}
?>