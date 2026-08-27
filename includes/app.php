<?php

use Dotenv\Dotenv;
use Model\ActiveRecord;
require __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

require 'funciones.php';
require 'database.php';


if(session_status() === PHP_SESSION_NONE){
    session_start();
}
//inicia sesion si no esta iniciada y este codigo es llamado desde el index.php



ActiveRecord::setDB($db);