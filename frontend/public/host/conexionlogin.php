<?php
$host = "localhost";
$user = "giancarlo_login";
$password = "Winner1103";
$dbname = "giancarlo_login";

// Crea la conexión
$conn = mysqli_connect($host, $user, $password, $dbname);
// Verifica la conexión
if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}
else{
    echo "holaa";
}
?>
