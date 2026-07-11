<?php 

require 'funciones.php';
require 'database.php';
require __DIR__ . '/../vendor/autoload.php';

if(session_status() === PHP_SESSION_NONE){
    session_start();
}
//inicia sesion si no esta iniciada y este codigo es llamado desde el index.php


// Conectarnos a la base de datos
use Model\ActiveRecord;
ActiveRecord::setDB($db);