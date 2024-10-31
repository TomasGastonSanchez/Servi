<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Conectar a la base de datos
include 'conexion.php'; // Asegúrate de tener este archivo configurado correctamente

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $tel = $_POST['tel'];
    $dom = $_POST['dom'];
    $cp = $_POST['cp'];

    // Asegúrate de sanitizar y validar los datos antes de la inserción
    $sql = "INSERT INTO clientes (nombre, apellido, tel, dom, cp) VALUES ('$nombre', '$apellido', '$tel', '$dom', '$cp')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'id' => $conn->insert_id]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al agregar cliente: ' . $conn->error]);
    }
}

$conn->close();
?>
