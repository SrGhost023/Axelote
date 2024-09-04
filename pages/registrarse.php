<?php
require "conexion.php";
// Verificar y asignar correctamente los campos
$nombre_real = isset($_POST['nombre_real']) ? trim($_POST['nombre_real']) : null;
$apellido_real = isset($_POST['apellido_real']) ? trim($_POST['apellido_real']) : null;
$nombre_de_usuario = isset($_POST['nombre_de_usuario']) ? trim($_POST['nombre_de_usuario']) : null;
$email = isset($_POST['email']) ? trim($_POST['email']) : null;
$direccion = isset($_POST['direccion']) ? trim($_POST['direccion']) : null;
$fecha_de_nacimiento = isset($_POST['fecha_de_nacimiento']) ? trim($_POST['fecha_de_nacimiento']) : null;
$contrasenia = isset($_POST['contrasenia']) ? trim($_POST['contrasenia']) : null;
$contrasenia_repetida = isset($_POST['contrasenia_repetida']) ? trim($_POST['contrasenia_repetida']) : null;

// Validar que los campos no estén vacíos
if (
    empty($nombre_real) || empty($apellido_real) || empty($nombre_de_usuario) || empty($email) || empty($direccion) ||
    empty($fecha_de_nacimiento) || empty($contrasenia)
) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
    exit();
}
// Verificar que el usuario no esté registrado
$sql_check = "SELECT * FROM usuario WHERE nombre_de_usuario = ? OR email = ?";
$stmt = $conexionALaBaseDeDatos->prepare($sql_check);
$stmt->bind_param("ss", $nombre_de_usuario, $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'El nombre de usuario o el correo electrónico ya están registrados.']);
    exit();
}
// Encriptar la contraseña
$contrasenia_hash = hash('sha512', $contrasenia);
// Insertar el nuevo usuario con la fecha de creación
$sql = "INSERT INTO usuario (nombre_real, apellido_real, nombre_de_usuario, email, 
    direccion, fecha_de_nacimiento, contrasenia, fecha_de_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
$stmt = $conexionALaBaseDeDatos->prepare($sql);
$stmt->bind_param(
    "sssssss", // Indicamos que los primeros 7 parámetros son strings
    $nombre_real,
    $apellido_real,
    $nombre_de_usuario,
    $email,
    $direccion,
    $fecha_de_nacimiento,
    $contrasenia_hash
);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Registro exitoso.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al registrar el usuario: ' . $conexionALaBaseDeDatos->error]);
}
// Cerrar la conexión
$stmt->close();
$conexionALaBaseDeDatos->close();