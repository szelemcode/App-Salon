<?php

namespace Model;

class Cita extends ActiveRecord{
    //Base de datos
    protected static $tabla = 'citas';
    protected static $columnasDB = ['id','fecha','hora','usuarioId']; //creamos el objeto con lo que hay en la base de datos

    public $id;// estos sirven para instanciar con lo que el usuario nos da
    public $fecha;
    public $hora;
    public $usuarioId;

    public function __construct($args =[])
    {
        $this->id =$args['id'] ?? null;
        $this->fecha =$args['fecha'] ?? '';
        $this->hora =$args['hora'] ?? '';
        $this->usuarioId =$args['usuarioId'] ?? '';
    }


}

?>