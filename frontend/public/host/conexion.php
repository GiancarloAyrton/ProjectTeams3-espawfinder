<?php
$host = "localhost";
$user = "giancarlo_userformulario";
$password = "GianKim20";
$dbname = "giancarlo_formulario";

// Crea la conexión
$conn = mysqli_connect($host, $user, $password, $dbname);
// Verifica la conexión
if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}
?>
