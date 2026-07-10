<?php
foreach($alertas as $key => $mensajes):
    foreach($mensajes as $mensaje):
 ?>

<div class="alerta <?php echo $key; ?>">
    <?php echo $mensaje; ?>
</div>
<?php
    endforeach;

endforeach;
?>
<!-- <h1>alerta</h1> -->