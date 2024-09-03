<?php
session_start();
require "conexion.php";
// Obtener datos del formulario
$usuario = $_POST['nombre_de_usuario'];
$contrasenia = $_POST['contrasenia'];
$contrasenia_hasheada = hash('sha512', $contrasenia);
// Consultar en la base de datos
$sql = "SELECT * FROM usuario WHERE nombre_de_usuario='$usuario' AND contrasenia='$contrasenia_hasheada'";
$result = $conexionALaBaseDeDatos->query($sql);

if ($result->num_rows > 0) {
    // Inicio de sesión exitoso
    $_SESSION['loggedIn'] = true;
    header("Location: index.html"); // Redireccionar al index
} else {
    // Inicio de sesión fallido
    echo "Nombre de usuario o contraseña incorrectos.";
}
$conexionALaBaseDeDatos->close();