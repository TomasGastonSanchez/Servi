<?php
$servername = "localhost:33065";
$username = "root";
$password = "foxy123";
$database = "accesousuarios";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
