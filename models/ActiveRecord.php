<?php

namespace Model;                              // Define el espacio de nombres de esta clase

class ActiveRecord {                          // Clase padre que heredarán los modelos

    // =========================
    // BASE DE DATOS
    // =========================

    protected static $db;                     // Guarda la conexión a la base de datos

    protected static $tabla = '';             // Nombre de la tabla; lo define cada clase hija

    protected static $columnasDB = [];        // Columnas de la tabla; las define cada clase hija


    // =========================
    // ALERTAS Y MENSAJES
    // =========================

    protected static $alertas = [];           // Guarda mensajes de error, éxito, etc.


    public static function setDB($database) { // Recibe la conexión desde database.php

        self::$db = $database;                // Guarda esa conexión en la clase padre
    }


    public static function setAlerta($tipo, $mensaje) { // Crea una alerta

        static::$alertas[$tipo][] = $mensaje;           // Guarda el mensaje según su tipo
    }


    public static function getAlertas() {     // Devuelve todas las alertas guardadas

        return static::$alertas;              // Retorna el array de alertas
    }


    public function validar() {               // Método base para validar datos

        static::$alertas = [];                // Limpia alertas anteriores

        return static::$alertas;              // Devuelve el array vacío o con errores
    }


    // =========================
    // CONSULTAS SQL Y OBJETOS
    // =========================

    public static function consultarSQL($query) {        // Ejecuta una consulta SQL

        $resultado = self::$db->query($query);           // Envía la consulta a MySQL

        $array = [];                                     // Guardará los objetos creados

        while($registro = $resultado->fetch_assoc()) {   // Recorre cada fila obtenida

            $array[] = static::crearObjeto($registro);   // Convierte la fila en objeto
        }

        $resultado->free();                              // Libera memoria del resultado

        return $array;                                   // Devuelve array de objetos
    }


    protected static function crearObjeto($registro) {   // Crea un objeto desde un registro

        $objeto = new static;                            // Crea objeto de la clase hija

        foreach($registro as $key => $value ) {          // Recorre columnas y valores

            if(property_exists( $objeto, $key  )) {      // Verifica que exista esa propiedad

                $objeto->$key = $value;                  // Asigna el valor al objeto
            }
        }

        return $objeto;                                  // Devuelve el objeto armado
    }


    // =========================
    // ATRIBUTOS Y SANITIZACIÓN
    // =========================

    public function atributos() {                        // Junta atributos del objeto

        $atributos = [];                                 // Array donde se guardan

        foreach(static::$columnasDB as $columna) {       // Recorre columnas definidas

            if($columna === 'id') continue;              // No incluye el id

            $atributos[$columna] = $this->$columna;      // Guarda columna => valor
        }

        return $atributos;                               // Devuelve atributos del objeto
    }


    public function sanitizarAtributos() {               // Limpia datos antes de guardar

        $atributos = $this->atributos();                 // Obtiene atributos del objeto

        $sanitizado = [];                                // Array para datos limpios

        foreach($atributos as $key => $value ) {         // Recorre cada atributo

            $sanitizado[$key] = self::$db->escape_string($value ?? '') ; // Escapa caracteres peligrosos
        }

        return $sanitizado;                              // Devuelve datos sanitizados
    }


    public function sincronizar($args=[]) {              // Actualiza el objeto con nuevos datos

        foreach($args as $key => $value) {               // Recorre datos recibidos

          if(property_exists($this, $key) && !is_null($value)) { // Verifica propiedad y valor

            $this->$key = $value;                        // Actualiza propiedad del objeto
          }
        }
    }


    // =========================
    // GUARDAR: CREAR O ACTUALIZAR
    // =========================

    public function guardar() {                          // Decide si crea o actualiza

        $resultado = '';                                 // Variable para guardar resultado

        if(!is_null($this->id)) {                        // Si tiene id, ya existe en BD

            $resultado = $this->actualizar();            // Actualiza el registro

        } else {                                         // Si no tiene id, es nuevo

            $resultado = $this->crear();                 // Crea un nuevo registro
        }

        return $resultado;                               // Devuelve resultado final
    }


    // =========================
    // CONSULTAS GENERALES
    // =========================

    public static function all() {                       // Trae todos los registros

        $query = "SELECT * FROM " . static::$tabla;      // Arma consulta SELECT

        $resultado = self::consultarSQL($query);         // Ejecuta y convierte en objetos

        return $resultado;                               // Devuelve todos los objetos
    }


    public static function find($id) {                   // Busca un registro por id

        $query = "SELECT * FROM " . static::$tabla  ." WHERE id = {$id}"; // Consulta por id

        $resultado = self::consultarSQL($query);         // Ejecuta consulta

        return array_shift( $resultado ) ;               // Devuelve el primer resultado
    }


    public static function get($limite) {                // Trae registros con límite

        $query = "SELECT * FROM " . static::$tabla . " LIMIT {$limite}"; // Consulta limitada

        $resultado = self::consultarSQL($query);         // Ejecuta consulta

        return array_shift( $resultado ) ;               // Ojo: devuelve solo el primero
    }


    
    public static function where($columna, $valor) {                   // Busca un registro por calumna y valor para ser reutilizable

        $query = "SELECT * FROM " . static::$tabla  ." WHERE {$columna} = '{$valor}';"; // Consulta por token
        $resultado = self::consultarSQL($query);         // Ejecuta consulta

        return array_shift( $resultado ) ;               // Devuelve el primer resultado
    }


    // =========================
    // CREAR REGISTRO
    // =========================

    public function crear() {                            // Inserta un registro nuevo

        $atributos = $this->sanitizarAtributos();        // Limpia atributos

        $query = " INSERT INTO " . static::$tabla . " ( "; // Comienza INSERT

        $query .= join(', ', array_keys($atributos));    // Agrega columnas

        $query .= " ) VALUES (' ";                       // Abre VALUES

        $query .= join("', '", array_values($atributos));// Agrega valores

        $query .= " ') ";                                // Cierra VALUES

        $resultado = self::$db->query($query);           // Ejecuta consulta

        return [                                         // Devuelve información
           'resultado' =>  $resultado,                   // true o false
           'id' => self::$db->insert_id                  // id insertado
        ];
    }


    // =========================
    // ACTUALIZAR REGISTRO
    // =========================

    public function actualizar() {                       // Actualiza registro existente

        $atributos = $this->sanitizarAtributos();        // Limpia atributos

        $valores = [];                                   // Guardará campo='valor'

        foreach($atributos as $key => $value) {          // Recorre atributos

            $valores[] = "{$key}='{$value}'";            // Arma columna='valor'
        }

        $query = "UPDATE " . static::$tabla ." SET ";    // Comienza UPDATE

        $query .=  join(', ', $valores );                // Une los valores con coma

        $query .= " WHERE id = '" . self::$db->escape_string($this->id) . "' "; // Condición por id

        $query .= " LIMIT 1 ";                           // Limita a un registro

        $resultado = self::$db->query($query);           // Ejecuta UPDATE

        return $resultado;                               // Devuelve true o false
    }


    // =========================
    // ELIMINAR REGISTRO
    // =========================

    public function eliminar() {                         // Elimina el registro actual

        $query = "DELETE FROM "  . static::$tabla . " WHERE id = " . self::$db->escape_string($this->id) . " LIMIT 1"; // Arma DELETE

        $resultado = self::$db->query($query);           // Ejecuta DELETE

        return $resultado;                               // Devuelve true o false
    }

}