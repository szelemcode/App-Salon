<?php

namespace Clases;

use PHPMailer\PHPMailer\PHPMailer;

class Email {

    public $email;
    public $nombre;
    public $token;

    public function __construct($email,$nombre,$token)
    {
        $this->email=$email;
        $this->nombre=$nombre;
        $this->token=$token;
    }

    public function enviarConfirmacion(){
        //crear el objeto de email
        $mail=new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '55b5c408880f11';
        $mail->Password = '66c7fb987ab879';

        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com','AppSalon.com');
        $mail->Subject='Confirma tu cuenta';

        //set HTML
        $mail->isHTML(TRUE);
        $mail->CharSet='UTF-8';
        $contenido="<html>";
        $contenido .="<p><strong>Hola " .$this->nombre . "</strong> Has creado tu cuenta en App salon, solo debes confirmar
        presionando el siguiente enlace</p>";
        $contenido .= "<p>Presiona aquí:
        <a href='http://localhost:3000/confirmar-cuenta?token=" . $this->token . "'>
        Confirmar Cuenta
        </a></p>";
        $contenido .="<p>Si tu no solicitaste esta cuenta , puedes ignorar el mensaje </P>";
        $contenido .="</html>";

        $mail->Body = $contenido;

        //enviar mail
        $mail->send();
    }

    public function enviarInstrucciones(){

    //crear el objeto de email
        $mail=new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '55b5c408880f11';
        $mail->Password = '66c7fb987ab879';

        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com','AppSalon.com');
        $mail->Subject='Reestablece tu password';

        //set HTML
        $mail->isHTML(TRUE);
        $mail->CharSet='UTF-8';
        $contenido="<html>";
        $contenido .="<p><strong>Hola " .$this->nombre . "</strong>Has solicitado
        reestablecer tu password, sigue el siguiente enlace para hacerlo</p>";
        $contenido .= "<p>Reestablecer:
        <a href='http://localhost:3000/recuperar?token=" . $this->token . "'>
        Confirmar Cuenta
        </a></p>";
        $contenido .="<p>Si tu no solicitaste esta cuenta , puedes ignorar el mensaje </P>";
        $contenido .="</html>";

        $mail->Body = $contenido;

        //enviar mail
        $mail->send();
    }
}


?>