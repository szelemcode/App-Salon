<?php

function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}

//Funcion que revisa si el usuario esta autenticado
function isAuth() : void  {
    if(!isset($_SESSION['login'])){ // pregunta si esta definida esta variable
        header('location: /');
    }
}