<?php
  $nombreDelServidorDeLaBaseDeDatos = 'localhost';
  $nombreDeLaBaseDeDatos = 'axelote';
  $nombreDeUsuarioDeLaBaseDeDatos = 'CultyManager';
  $contraseniaDeLaBaseDeDatos = 'guseriluadri2024';
  $conexionALaBaseDeDatos = mysqli_connect($nombreDelServidorDeLaBaseDeDatos, $nombreDeUsuarioDeLaBaseDeDatos, 
                                           $contraseniaDeLaBaseDeDatos, $nombreDeLaBaseDeDatos);

  if (!$conexionALaBaseDeDatos) {
    die("Error de Conexión: " . mysqli_connect_error());
  }
  echo "Conexión Exitosa";
  mysqli_close($conexionALaBaseDeDatos);