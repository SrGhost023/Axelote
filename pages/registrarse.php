<?php
require "conexion.php";
$conexionALaBaseDeDatos = new mysqli($nombreDelServidorDeLaBaseDeDatos, $nombreDeUsuarioDeLaBaseDeDatos, $contraseniaDeLaBaseDeDatos, $nombreDeLaBaseDeDatos);

// Verificar la conexión
if ($conexionALaBaseDeDatos->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Error al conectar a la base de datos: ' . $conexionALaBaseDeDatos->connect_error]));
}

// Verificar si el método es POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    var_dump($_POST);
    // Verificar que todos los campos estén presentes
    $nombre_real = isset($_POST['nombre_real']);
    $apellido_real = isset($_POST['apellido_real']) ? trim($_POST['apellido_real']) : null;
    $nombre_de_usuario = isset($_POST['nombre_de_usuario']) ? trim($_POST['nombre_de_usuario']) : null;
    $email = isset($_POST['email']) ? trim($_POST['email']) : null;
    $direccion = isset($_POST['direccion']) ? trim($_POST['direccion']) : null;
    $fecha_de_nacimiento = isset($_POST['fecha-de-nacimiento']) ? trim($_POST['fecha-de-nacimiento']) : null;
    $contrasenia = isset($_POST['contrasenia']) ? trim($_POST['contrasenia']) : null;
    $contrasenia_repetida = isset($_POST['contrasenia-repetida']) ? trim($_POST['contrasenia-repetida']) : null;

    // Validar que los campos no estén vacíos
    if (empty($nombre_real) || empty($apellido_real) || empty($nombre_de_usuario) || empty($email) || empty($direccion) || empty($fecha_de_nacimiento) || empty($contrasenia)) {
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
    $contrasenia_hash = password_hash($contrasenia, PASSWORD_BCRYPT);

    // Insertar el nuevo usuario
    $sql = "INSERT INTO usuarios (nombre_real, apellido_real, nombre_de_usuario, email, direccion, fecha_de_nacimiento, contrasenia) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $nombre_real, $apellido_real, $nombre_de_usuario, $email, $direccion, $fecha_de_nacimiento, $contrasenia_hash);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Registro exitoso.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al registrar el usuario: ' . $conexionALaBaseDeDatos->error]);
    }

    // Cerrar la conexión
    $stmt->close();
    $conexionALaBaseDeDatos->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no válido.']);
}