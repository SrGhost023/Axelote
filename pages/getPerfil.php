<?php
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado.']);
    exit();
}

// Conectar a la base de datos
require "conexion.php";

// Obtener el ID del usuario de la sesión
$user_id = $_SESSION['id'];

// Preparar la consulta SQL para obtener los datos del usuario
$sql = "SELECT nombre_real, apellido_real, nombre_de_usuario, email, direccion, fecha_de_nacimiento FROM usuario WHERE id = ?";
$stmt = $conexionALaBaseDeDatos->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontraron resultados
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(['success' => true, 'user' => $user]);
} else {
    echo json_encode(['success' => false, 'message' => 'No se encontraron datos para este usuario.']);
}

$stmt->close();
$conexionALaBaseDeDatos->close();
?>
