<?php
  require "conexion.php";

  $sql = "SELECT * FROM usuario"; // Asegúrate de usar el nombre correcto de la tabla

  // Ejecutar la consulta
  $resultado = $conexionALaBaseDeDatos->query($sql);

  if ($resultado === FALSE) {
      die("Error en la consulta: " . $conexionALaBaseDeDatos->error);
  }

  // Verificar si la consulta devolvió resultados
  if ($resultado->num_rows > 0) {
      // Imprimir los datos de cada fila
      while ($fila = $resultado->fetch_assoc()) {
          echo "ID: " . $fila["id"] . " - Nombre: " . $fila["nombre_real"] . " " . $fila["apellido_real"] . " - Usuario: " . $fila["nombre_de_usuario"] . " - Correo: " . $fila["email"] . "<br>";
      }
  } else {
      echo "0 resultados";
  }

  // Cerrar la conexión
  $conexionALaBaseDeDatos->close();