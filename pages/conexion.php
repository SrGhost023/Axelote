<?php
  $nombreDelServidorDeLaBaseDeDatos = 'localhost';
  $nombreDeLaBaseDeDatos = 'axelote';
  $nombreDeUsuarioDeLaBaseDeDatos = 'root';
  $contraseniaDeLaBaseDeDatos = '';
  $conexionALaBaseDeDatos = mysqli_connect($nombreDelServidorDeLaBaseDeDatos, $nombreDeUsuarioDeLaBaseDeDatos, 
                                           $contraseniaDeLaBaseDeDatos, $nombreDeLaBaseDeDatos);

  if (!$conexionALaBaseDeDatos) {
    die("Error de Conexión: " . mysqli_connect_error());
  }