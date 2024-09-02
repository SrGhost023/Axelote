<?php
  require "conexion.php";
  $seleccionDeLaTablaUsuarios = "SELECT * FROM usuario";
  $resultadoDeLaSeleccionDeUsuarios = $conexionALaBaseDeDatos->query($seleccionDeLaTablaUsuarios);

  if ($resultadoDeLaSeleccionDeUsuarios === FALSE)
      die("Error en la consulta: " . $conexionALaBaseDeDatos->error);
  if ($resultadoDeLaSeleccionDeUsuarios->num_rows > 0) {
      while ($fila = $resultadoDeLaSeleccionDeUsuarios->fetch_assoc()) {
          echo "ID: " . $fila["id"] . " - Nombre: " . $fila["nombre_real"] . " " . $fila["apellido_real"] . 
          " - Usuario: " . $fila["nombre_de_usuario"] . " - Correo: " . $fila["email"] . "<br />";
      }
  } else {
      echo "0 resultados";
  }
  $conexionALaBaseDeDatos->close();