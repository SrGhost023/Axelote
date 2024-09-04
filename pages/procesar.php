<?php
require "conexion.php";
session_start(); // Asegúrate de iniciar la sesión para acceder a las variables de sesión
$terminoDeBusqueda = isset($_GET['query']) ? $_GET['query'] : '';

if (!empty($terminoDeBusqueda)) {
    // Filtrar productos solo por el nombre
    $consulta = "SELECT * FROM producto WHERE nombre LIKE ?";
    $stmt = $conexionALaBaseDeDatos->prepare($consulta);

    if (!$stmt) {
        // Manejar errores de preparación de la consulta
        $respuesta = array("error" => "Error en la preparación de la consulta: " . $conexionALaBaseDeDatos->error);
        header('Content-Type: application/json');
        echo json_encode($respuesta);
        exit;
    }
    $likeTerm = "%" . $terminoDeBusqueda . "%";
    $stmt->bind_param("s", $likeTerm);
    $stmt->execute();
    $resultadoDeLaSeleccionDeProductos = $stmt->get_result();
} else {
    // Mostrar todos los productos si no hay término de búsqueda
    $consulta = "SELECT * FROM producto";
    $resultadoDeLaSeleccionDeProductos = $conexionALaBaseDeDatos->query($consulta);

    if ($resultadoDeLaSeleccionDeProductos === FALSE) {
        // Manejar errores de consulta
        $respuesta = array("error" => "Error en la consulta: " . $conexionALaBaseDeDatos->error);
        header('Content-Type: application/json');
        echo json_encode($respuesta);
        exit;
    }
}
$productos = array();

// Procesar los resultados de la consulta
while ($fila = $resultadoDeLaSeleccionDeProductos->fetch_assoc()) {
    // Convertir 'precio' a número decimal
    $fila['precio'] = (float) $fila['precio'];
    $productos[] = $fila;
}
header('Content-Type: application/json');
echo json_encode($productos);
// Acción para agregar un producto al carrito
if (isset($_POST['action']) && $_POST['action'] == 'add_to_cart') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(array("error" => "Usuario no autenticado."));
        exit;
    }
    $productoId = $_POST['product_id'];
    $usuarioId = $_SESSION['user_id']; // Obtener el ID del usuario de la sesión
    $fecha = date('Y-m-d H:i:s');
    $consulta = "INSERT INTO carrito (usuario_id, producto_id, fecha_en_la_que_se_agrego) VALUES (?, ?, ?)";
    $stmt = $conexionALaBaseDeDatos->prepare($consulta);

    if (!$stmt) {
        $respuesta = array("error" => "Error en la preparación de la consulta: " . $conexionALaBaseDeDatos->error);
        header('Content-Type: application/json');
        echo json_encode($respuesta);
        exit;
    }
    $stmt->bind_param("iis", $usuarioId, $productoId, $fecha);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("error" => "No se pudo agregar el producto al carrito."));
    }
    exit;
}
// Acción para eliminar un producto del carrito
if (isset($_POST['action']) && $_POST['action'] == 'remove_from_cart') {
    $carritoId = $_POST['carrito_id'];
    $consulta = "DELETE FROM carrito WHERE id = ?";
    $stmt = $conexionALaBaseDeDatos->prepare($consulta);

    if (!$stmt) {
        $respuesta = array("error" => "Error en la preparación de la consulta: " . $conexionALaBaseDeDatos->error);
        header('Content-Type: application/json');
        echo json_encode($respuesta);
        exit;
    }
    $stmt->bind_param("i", $carritoId);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("error" => "No se pudo eliminar el producto del carrito."));
    }
    exit;
}
// Acción para obtener los productos en el carrito del usuario
if (isset($_GET['action']) && $_GET['action'] == 'get_cart') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(array("error" => "Usuario no autenticado."));
        exit;
    }
    $usuarioId = $_SESSION['user_id']; // Obtener el ID del usuario de la sesión
    $consulta = "SELECT c.id, p.nombre, p.descripcion, p.precio, p.url_de_la_imagen 
                 FROM carrito c
                 JOIN producto p ON c.producto_id = p.id
                 WHERE c.usuario_id = ?";
    $stmt = $conexionALaBaseDeDatos->prepare($consulta);

    if (!$stmt) {
        $respuesta = array("error" => "Error en la preparación de la consulta: " . $conexionALaBaseDeDatos->error);
        header('Content-Type: application/json');
        echo json_encode($respuesta);
        exit;
    }
    $stmt->bind_param("i", $usuarioId);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $productos = array();

    while ($fila = $resultado->fetch_assoc()) {
        $productos[] = $fila;
    }
    header('Content-Type: application/json');
    echo json_encode($productos);
    exit;
}
// Cerrar la conexión
$conexionALaBaseDeDatos->close();