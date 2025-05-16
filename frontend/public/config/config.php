<?php
// Configuración de la base de datos
$hostname = 'localhost';  // Cambia esto si tu base de datos está en un servidor remoto
$database = 'mascotas_perdidas';  // Nombre de la base de datos que creaste
$username = 'redyanbal_busqueda';  // Nombre de usuario de la base de datos
$password = 'Winner1103';  // Contraseña de la base de datos

// Conexión a la base de datos
$conn = mysqli_connect($hostname, $username, $password, $database);

// Verificar si la conexión fue exitosa
if (!$conn) {
    die('Error de conexión a la base de datos: ' . mysqli_connect_error());
}