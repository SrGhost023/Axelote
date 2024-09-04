<?php
session_start();
require "conexion.php";

// Crear conexión
$conexionALaBaseDeDatos = new mysqli($nombreDelServidorDeLaBaseDeDatos, $nombreDeUsuarioDeLaBaseDeDatos, $contraseniaDeLaBaseDeDatos, $nombreDeLaBaseDeDatos);

// Verificar conexión
if ($conexionALaBaseDeDatos->connect_error) {
    die("Conexión fallida: " . $conexionALaBaseDeDatos->connect_error);
}

// Obtener datos del formulario
$usuario = $_POST['nombre_de_usuario'];
$contrasenia = $_POST['contrasenia'];
$contrasenia_hasheada = hash('sha512', $contrasenia);

// Consultar en la base de datos
$sql = "SELECT * FROM usuario WHERE nombre_de_usuario='$usuario' AND contrasenia='$contrasenia_hasheada'";
$result = $conexionALaBaseDeDatos->query($sql);

if ($result->num_rows > 0) {
    // Inicio de sesión exitoso
    setcookie("loggedIn", "true", time() + (86400 * 30), "/"); // Establecer cookie por 30 días
    $_SESSION['loggedIn'] = true; // Para la sesión de servidor (opcional)
    header("Location: index.html"); // Redireccionar al index
} else {
    // Inicio de sesión fallido
    echo "Nombre de usuario o contraseña incorrectos.";
}

$conexionALaBaseDeDatos->close();
?>
