<?php
  require "conexion.php";
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
  // Cerrar la conexión
  $conexionALaBaseDeDatos->close();