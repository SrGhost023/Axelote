<?php
require "conexion.php";

$seleccionDeLaTablaProductos = "SELECT * FROM producto";
$resultadoDeLaSeleccionDeProductos = $conexionALaBaseDeDatos->query($seleccionDeLaTablaProductos);

if ($resultadoDeLaSeleccionDeProductos === FALSE) {
    die("Error en la consulta: " . $conexionALaBaseDeDatos->error);
}

$productos = array();
while ($fila = $resultadoDeLaSeleccionDeProductos->fetch_assoc()) {
    $productos[] = $fila;
}

header('Content-Type: application/json');
echo json_encode($productos);

$conexionALaBaseDeDatos->close();
