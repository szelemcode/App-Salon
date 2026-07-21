<?php

namespace Model;

class Servicios extends ActiveRecord {
    //base de datos
    protected static $tabla ='servicios';
    protected static $columnasDB = ['id','nombre','precio'];

    //Registrar atributos
    public $id;
    public $nombre;
    public $precio;

    public function __construct($args=[]){

       $this->id = $args['id'] ?? null;
       $this->nombre = $args['nombre'] ?? '' ;
       $this->precio = $args['precio'] ?? '' ;
    }
}
?>
    
