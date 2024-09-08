<?php
session_start();
require "conexion.php"; // Incluye tu archivo de conexión a la base de datos

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['error' => 'No estás autenticado']);
    exit();
}

$usuario_id = $_SESSION['usuario_id'];

// Consulta a la base de datos para obtener los datos del usuario
$query = "SELECT nombre, apellido, usuario, email, direccion, fecha_nacimiento FROM usuario WHERE id = ?";
$stmt = $conexionALaBaseDeDatos->prepare($query);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode($user);
} else {
    echo json_encode(['error' => 'Usuario no encontrado']);
}

$stmt->close();
$conexionALaBaseDeDatos->close();
?>
