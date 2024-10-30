<?php
$servername = "localhost:33065";
$username = "root";
$password = "foxy123";
$database = "servi";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
else {
    echo "Conexión exitosa a la base de datos.";
}
?>
