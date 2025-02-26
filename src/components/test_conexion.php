<?php
// Incluir el archivo de conexión
include 'conexion.php';

// Probar la conexión
if ($conn) {
    echo "Conexión exitosa a la base de datos.";
} else {
    echo "Error en la conexión: " . mysqli_connect_error();
}
?>
